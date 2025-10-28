const BASE_URL = "https://api.pokemontcg.io/v2";
const API_KEY = import.meta.env.VITE_TCG_API_KEY || "";

export async function fetchTCG(endpoint, params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}${endpoint}?${query}`, {
    headers: API_KEY ? { "X-Api-Key": API_KEY } : {},
  });
  if (!res.ok) {
    throw new Error(`TCG API error: ${res.status}`);
  }
  return res.json();
}
