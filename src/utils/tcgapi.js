import { cacheRead, cacheWrite } from "./cache";

const API_BASE = "/api/tcg/cards";

async function rawFetch(params = {}) {
  const url = new URL(API_BASE, window.location.origin);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error(`TCG proxy/API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

function normalizeTCGCard(card) {
  if (!card) return null;
  return {
    ...card,
    id: card.id,
    name: card.name,
    rarity: card.rarity || "Unknown",
    images: card.images || {},
  };
}

export async function fetchTrendingCards(page = 1, pageSize = 24) {
  const json = await rawFetch({
    page,
    pageSize,
    orderBy: "-set.releaseDate",
  });

  const rawCards = Array.isArray(json.data) ? json.data : [];
  return rawCards.map(normalizeTCGCard);
}

export async function fetchTCGCardByName(name) {
  const json = await rawFetch({
    q: `name:"${name}"`,
    pageSize: 1,
  });

  const first = Array.isArray(json.data) ? json.data[0] : null;
  return normalizeTCGCard(first);
}

export async function fetchTCGCardNames() {
  const CACHE_KEY = "tcg_pokemon_names_v1";

  const cached = cacheRead?.(CACHE_KEY);
  if (cached && Array.isArray(cached) && cached.length > 0) {
    return cached;
  }

  const json = await rawFetch({
    pageSize: 100,
    orderBy: "name",
  });

  const data = Array.isArray(json.data) ? json.data : [];

  const names = Array.from(
    new Set(data.map((c) => c.name).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b));

  cacheWrite?.(CACHE_KEY, names);
  return names;
}
