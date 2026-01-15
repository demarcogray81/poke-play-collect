import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.disable("etag");
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});
app.use(cors());

const PTCG_BASE = "https://api.pokemontcg.io/v2";
const PTCG_API_KEY =
  process.env.TCG_API_KEY || process.env.POKEMONTCG_API_KEY || "";
const UPSTREAM_TIMEOUT_MS = Number(process.env.UPSTREAM_TIMEOUT_MS || 60000);

const HEADERS = PTCG_API_KEY ? { "X-Api-Key": PTCG_API_KEY } : {};

const cache = new Map();
const now = () => Date.now();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const cacheGet = (key) => {
  const hit = cache.get(key);
  if (!hit) return null;
  if (now() > hit.expiresAt) return cache.delete(key), null;
  return hit.value;
};
const cacheSet = (key, value, ttlMs) =>
  cache.set(key, { value, expiresAt: now() + ttlMs });

function toInt(v, fallback) {
  const n = Number.parseInt(String(v), 10);
  return Number.isFinite(n) ? n : fallback;
}

async function fetchWithRetry(url, retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

    try {
      const res = await fetch(url, {
        headers: HEADERS,
        signal: controller.signal,
      });
      clearTimeout(t);

      if ([429, 500, 502, 503, 504].includes(res.status) && attempt < retries) {
        await sleep(500 * (attempt + 1));
        continue;
      }

      const text = await res.text();
      return { ok: res.ok, status: res.status, text };
    } catch (err) {
      clearTimeout(t);
      const aborted =
        err?.name === "AbortError" ||
        err?.type === "aborted" ||
        String(err).toLowerCase().includes("aborted");

      if (attempt < retries) {
        await sleep(500 * (attempt + 1));
        continue;
      }

      const e = new Error(
        aborted ? "Upstream request timed out" : err?.message || String(err)
      );
      e.status = aborted ? 504 : 500;
      throw e;
    }
  }
}

function jsonError(res, status, message, detail = "") {
  return res.status(status).json({
    error: message,
    status,
    detail: detail ? String(detail).slice(0, 300) : "",
  });
}

async function proxyJson(res, { cacheKey, staleKey, url, ttlMs, staleTtlMs }) {
  const cached = cacheGet(cacheKey);
  if (cached) return res.json(cached);

  try {
    const { ok, status, text } = await fetchWithRetry(url);

    if (!ok) {
      const e = new Error(text);
      e.status = status;
      throw e;
    }

    const data = JSON.parse(text || "{}");
    cacheSet(cacheKey, data, ttlMs);
    cacheSet(staleKey, data, staleTtlMs);
    return res.json(data);
  } catch (err) {
    const status = err?.status || 500;
    const stale = cacheGet(staleKey);
    if (stale) return res.json(stale);
    return jsonError(
      res,
      status,
      status === 504 ? "Upstream request timed out" : "Proxy server error",
      err?.message || String(err)
    );
  }
}

let latestSet = { id: null, expiresAt: 0 };

async function getLatestSetId() {
  if (latestSet.id && now() < latestSet.expiresAt) return latestSet.id;

  const url = new URL(`${PTCG_BASE}/sets`);
  url.searchParams.set("pageSize", "1");
  url.searchParams.set("page", "1");
  url.searchParams.set("orderBy", "-releaseDate");

  const { ok, text } = await fetchWithRetry(url.toString());
  if (!ok) throw new Error(text);

  const id = JSON.parse(text || "{}")?.data?.[0]?.id;
  if (!id) throw new Error("No set id from upstream");

  latestSet = { id, expiresAt: now() + 6 * 60 * 60 * 1000 };
  return id;
}

app.get("/api/tcg/health", (req, res) => {
  res.json({
    ok: true,
    hasKey: Boolean(PTCG_API_KEY),
    upstreamTimeoutMs: UPSTREAM_TIMEOUT_MS,
  });
});

app.get("/api/tcg/cards", async (req, res) => {
  const pageSize = Math.min(
    Math.max(toInt(req.query.pageSize ?? req.query.limit, 4), 1),
    250
  );
  const page = Math.max(toInt(req.query.page, 1), 1);

  let setId = req.query.set ? String(req.query.set) : "";
  const incomingQ = req.query.q ? String(req.query.q) : "";

  if (!setId && incomingQ) {
    const m = incomingQ.match(/set\.id:([a-zA-Z0-9_-]+)/);
    if (m) setId = m[1];
  }

  if (!setId && !incomingQ) {
    try {
      setId = await getLatestSetId();
    } catch {
      // ok to fall back to generic query
    }
  }

  const select = req.query.select
    ? String(req.query.select)
    : "id,name,rarity,images,set.id,set.releaseDate";

  const orderBy = req.query.orderBy
    ? String(req.query.orderBy)
    : "-set.releaseDate,-id";

  const url = new URL(`${PTCG_BASE}/cards`);
  url.searchParams.set("pageSize", String(pageSize));
  url.searchParams.set("page", String(page));

  const q = incomingQ || (setId ? `set.id:${setId}` : "");
  if (q) url.searchParams.set("q", q);

  url.searchParams.set("orderBy", orderBy);
  if (select) url.searchParams.set("select", select);

  console.log("UPSTREAM URL:", url.toString());

  const staleKey = setId ? `cards:stale:${setId}` : "cards:stale:generic";

  return proxyJson(res, {
    cacheKey: `cards:${JSON.stringify(req.query || {})}`,
    staleKey,
    url: url.toString(),
    ttlMs: 5 * 60 * 1000,
    staleTtlMs: 2 * 60 * 60 * 1000,
  });
});

app.get("/api/tcg/cards/search", async (req, res) => {
  const name = String(req.query.name || "").trim();
  if (!name) return jsonError(res, 400, "Missing required query param: name");

  const safe = name.replace(/["*]/g, "");
  const q = `name:*${safe}*`;

  const url = new URL(`${PTCG_BASE}/cards`);
  url.searchParams.set("q", q);
  url.searchParams.set("page", "1");
  url.searchParams.set("pageSize", "20");
  url.searchParams.set("orderBy", "-set.releaseDate,-id");
  url.searchParams.set(
    "select",
    "id,name,rarity,images,set.id,set.releaseDate"
  );

  return proxyJson(res, {
    cacheKey: `search:${safe.toLowerCase()}`,
    staleKey: "search:stale",
    url: url.toString(),
    ttlMs: 2 * 60 * 1000,
    staleTtlMs: 30 * 60 * 1000,
  });
});

const PORT = process.env.PROXY_PORT || 5174;
app.listen(PORT, () => console.log(`Proxy listening on port ${PORT}`));
