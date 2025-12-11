import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();

const TCG_API_BASE = "https://api.pokemontcg.io/v2/cards";
const TCG_API_KEY = process.env.VITE_TCG_API_KEY || "";

if (!TCG_API_KEY) {
  console.log(
    "ℹ️ No VITE_TCG_API_KEY set. Using anonymous access to PokémonTCG (OK for review, just lower rate limits)."
  );
}

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.get("/api/tcg/cards", async (req, res) => {
  try {
    const url = new URL(TCG_API_BASE);

    Object.entries(req.query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, String(value));
      }
    });

    const headers = {};
    if (TCG_API_KEY) {
      headers["X-Api-Key"] = TCG_API_KEY;
    }

    const apiRes = await fetch(url.toString(), { headers });

    if (!apiRes.ok) {
      const text = await apiRes.text().catch(() => "");
      console.error("PokémonTCG error:", apiRes.status, text.slice(0, 200));
      return res.status(502).json({
        error: "Upstream PokémonTCG API error",
        status: apiRes.status,
      });
    }

    const data = await apiRes.json();
    res.json(data);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Proxy server error" });
  }
});

const PORT = process.env.PROXY_PORT || 5174;
app.listen(PORT, () => {
  console.log(`Proxy listening on http://localhost:${PORT}`);
});
