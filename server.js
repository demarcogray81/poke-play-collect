import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();

const TCG_API_BASE = "https://api.pokemontcg.io/v2/cards";
const TCG_API_KEY = process.env.VITE_TCG_API_KEY;

if (!TCG_API_KEY) {
  console.warn(
    "⚠️ VITE_TCG_API_KEY is not set in .env — PokémonTCG requests will fail."
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

    const apiRes = await fetch(url.toString(), {
      headers: {
        "X-Api-Key": TCG_API_KEY,
      },
    });

    if (!apiRes.ok) {
      const text = await apiRes.text().catch(() => "");
      console.error("PokémonTCG error:", apiRes.status, text);
      return res
        .status(apiRes.status)
        .json({ error: `PokémonTCG error ${apiRes.status}` });
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
