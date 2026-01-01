import { cacheRead, cacheWrite } from "./cache";

const PROD_API_BASE = "https://poke-play-collect.onrender.com/api/tcg";
const DEV_API_BASE = "/api/tcg";
const API_BASE = import.meta.env.DEV ? DEV_API_BASE : PROD_API_BASE;

const makeUrl = (path) => `${API_BASE}${path}`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function apiFetch(path, { timeoutMs = 60000, retries = 2 } = {}) {
  const url = makeUrl(path);

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const res = await fetch(url, {
        signal: controller.signal,
        cache: "no-store",
        headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
      });
      clearTimeout(t);

      const text = await res.text();

      let json = {};
      try {
        json = text ? JSON.parse(text) : {};
      } catch {
        json = { error: text };
      }

      if ([429, 500, 502, 503, 504].includes(res.status) && attempt < retries) {
        await sleep(600 * (attempt + 1));
        continue;
      }

      if (!res.ok)
        throw new Error(json?.error || `Request failed (${res.status})`);
      return json;
    } catch (err) {
      clearTimeout(t);
      if (attempt === retries) {
        throw new Error(
          err?.name === "AbortError"
            ? "Request timed out"
            : err?.message || String(err)
        );
      }
      await sleep(600 * (attempt + 1));
    }
  }
}

const normalizeCard = (card) => ({
  ...card,
  id: String(card?.id ?? `${Date.now()}-${Math.random()}`),
  name: card?.name || "Unknown",
  rarity: card?.rarity || "Unknown",
  images: {
    small: card?.images?.small || "",
    large: card?.images?.large || card?.images?.small || "",
  },
});

export async function fetchTrendingCards(page = 1, pageSize = 4) {
  const select = "id,name,rarity,images,number,set.id,set.releaseDate";
  const orderBy = "-set.releaseDate,-id";

  const json = await apiFetch(
    `/cards?page=${encodeURIComponent(page)}&pageSize=${encodeURIComponent(
      pageSize
    )}` +
      `&orderBy=${encodeURIComponent(orderBy)}` +
      `&select=${encodeURIComponent(select)}`
  );

  return (Array.isArray(json?.data) ? json.data : []).map(normalizeCard);
}

export async function fetchTCGCardByName(name) {
  const q = String(name || "").trim();
  if (!q) return null;

  const json = await apiFetch(`/cards/search?name=${encodeURIComponent(q)}`);
  const card = Array.isArray(json?.data) ? json.data[0] : null;
  return card ? normalizeCard(card) : null;
}

export async function fetchTCGCardNames() {
  const CACHE_KEY = "tcg_pokemon_names_v3";
  const cached = cacheRead?.(CACHE_KEY);
  if (Array.isArray(cached) && cached.length) return cached;

  const json = await apiFetch(`/cards?page=1&pageSize=250&select=name`);
  const data = Array.isArray(json?.data) ? json.data : [];

  const names = [...new Set(data.map((c) => c?.name).filter(Boolean))].sort(
    (a, b) => a.localeCompare(b)
  );

  cacheWrite?.(CACHE_KEY, names);
  return names;
}

export async function searchCardsByName(name) {
  const q = String(name || "").trim();
  if (!q) return [];

  const json = await apiFetch(`/cards/search?name=${encodeURIComponent(q)}`);
  const cards = Array.isArray(json?.data) ? json.data : [];
  return cards.map(normalizeCard);
}
