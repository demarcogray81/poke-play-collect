const API_BASE = "https://api.pokemontcg.io/v2/cards";
const API_KEY = import.meta.env.VITE_TCG_API_KEY;

async function fetchWithKey(url) {
  console.log("🔵 Calling:", url);
  console.log("🔑 API KEY loaded:", API_KEY ? "✅ YES" : "❌ NO");

  const response = await fetch(url, {
    headers: { "X-Api-Key": API_KEY },
  });

  console.log("📡 Status:", response.status);

  return response;
}

export async function fetchTCGCards(page = 1, pageSize = 20) {
  const response = await fetch(
    `https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=${pageSize}`,
    {
      headers: { "X-Api-Key": import.meta.env.VITE_TCG_API_KEY },
    }
  );
  const data = await response.json();
  return data.data;
}

export async function fetchTCGCardByName(name) {
  try {
    const query = `q=name:"${name}"&orderBy=-set.releaseDate`;
    console.log("🟣 Searching for:", name);

    const response = await fetchWithKey(`${API_BASE}?${query}`);
    if (!response.ok) throw new Error("Failed to fetch card data");

    const data = await response.json();

    console.log("🟣 API responded with:", data);

    return data.data?.[0] || null;
  } catch (error) {
    console.error("Error fetching TCG card:", error);
    return null;
  }
}

export async function fetchTCGCardNames() {
  try {
    const response = await fetchWithKey(`${API_BASE}?pageSize=250`);
    if (!response.ok) throw new Error("Failed to fetch card list");
    const data = await response.json();
    return data.data.map((card) => card.name);
  } catch (error) {
    console.error("Error fetching TCG card names:", error);
    return [];
  }
}
