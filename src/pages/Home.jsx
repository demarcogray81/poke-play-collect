import { useEffect, useState } from "react";
import CardModal from "../components/CardModal";
import Pagination from "../components/Pagination";

export default function Home({ onAddToCollection, onAddToDreamList }) {
  const API_KEY = import.meta.env.VITE_TCG_API_KEY;

  // NEW RELEASES
  const [newCards, setNewCards] = useState([]);

  // FULL BROWSER
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  // FILTERS & SORTING
  const [rarityFilter, setRarityFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortOption, setSortOption] = useState("name-asc");

  // ☑ Load newest cards
  useEffect(() => {
    async function loadNewReleases() {
      try {
        const response = await fetch(
          `https://api.pokemontcg.io/v2/cards?pageSize=12&orderBy=-set.releaseDate`,
          { headers: { "X-Api-Key": API_KEY } }
        );
        const data = await response.json();
        setNewCards(data.data || []);
      } catch {
        console.error("Failed to load new releases");
      }
    }
    loadNewReleases();
  }, []);

  // ☑ Load full card browser
  useEffect(() => {
    async function loadCards() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=250`,
          { headers: { "X-Api-Key": API_KEY } }
        );
        const data = await response.json();
        setCards(data.data || []);
      } catch {
        console.error("Failed to load cards");
      }
      setLoading(false);
    }
    loadCards();
  }, [page]);

  // FILTER
  const filteredCards = cards
    .filter((c) => {
      const rMatch = rarityFilter
        ? c.rarity?.toLowerCase() === rarityFilter.toLowerCase()
        : true;

      const tMatch = typeFilter ? c.types?.includes(typeFilter) : true;

      return rMatch && tMatch;
    })
    .sort((a, b) => {
      if (sortOption === "name-asc") return a.name.localeCompare(b.name);
      if (sortOption === "name-desc") return b.name.localeCompare(a.name);
      if (sortOption === "rarity-asc")
        return (a.rarity || "").localeCompare(b.rarity || "");
      if (sortOption === "rarity-desc")
        return (b.rarity || "").localeCompare(a.rarity || "");
      return 0;
    });

  return (
    <div className="text-center">
      {/* ⭐ NEW & TRENDING SECTION ⭐ */}
      <h2 className="text-3xl font-bold text-blue-500 mt-4">New & Trending</h2>
      <p className="text-gray-400 mb-4">Freshest cards from the newest sets</p>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 p-3">
        {newCards.map((card) => (
          <div
            key={card.id}
            className="bg-gray-800 hover:bg-gray-700 rounded-lg p-2 shadow cursor-pointer transition"
            onClick={() => setSelectedCard(card)}
          >
            <img
              src={card.images?.small}
              alt={card.name}
              className="rounded-md w-full object-contain"
            />
            <p className="mt-2 text-xs text-gray-300">{card.name}</p>
            <p className="text-[10px] text-gray-500">{card.set?.name}</p>
          </div>
        ))}
      </div>

      {/* ⭐ FILTER / SORT CONTROLS ⭐ */}
      <h2 className="text-2xl font-bold text-blue-400 mt-8">
        All Pokémon Cards
      </h2>

      <div className="flex flex-wrap justify-center gap-3 my-4">
        {/* Rarity */}
        <select
          onChange={(e) => setRarityFilter(e.target.value)}
          className="px-3 py-2 bg-gray-800 rounded"
        >
          <option value="">All Rarities</option>
          <option value="Common">Common</option>
          <option value="Uncommon">Uncommon</option>
          <option value="Rare">Rare</option>
          <option value="Holo Rare">Holo Rare</option>
          <option value="Ultra Rare">Ultra Rare</option>
          <option value="Secret Rare">Secret Rare</option>
        </select>

        {/* Type */}
        <select
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-3 py-2 bg-gray-800 rounded"
        >
          <option value="">All Types</option>
          <option value="Fire">Fire</option>
          <option value="Water">Water</option>
          <option value="Grass">Grass</option>
          <option value="Electric">Electric</option>
          <option value="Psychic">Psychic</option>
          <option value="Fighting">Fighting</option>
          <option value="Darkness">Darkness</option>
          <option value="Metal">Metal</option>
          <option value="Dragon">Dragon</option>
          <option value="Colorless">Colorless</option>
        </select>

        {/* Sorting */}
        <select
          onChange={(e) => setSortOption(e.target.value)}
          className="px-3 py-2 bg-gray-800 rounded"
        >
          <option value="name-asc">A → Z</option>
          <option value="name-desc">Z → A</option>
          <option value="rarity-asc">Low → High Rarity</option>
          <option value="rarity-desc">High → Low Rarity</option>
        </select>
      </div>

      {/* ⭐ FULL CARD GRID ⭐ */}
      {loading ? (
        <p className="text-gray-400">Loading cards…</p>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 p-3">
          {filteredCards.map((card) => (
            <div
              key={card.id}
              className="bg-gray-800 hover:bg-gray-700 rounded-lg p-2 shadow cursor-pointer transition"
              onClick={() => setSelectedCard(card)}
            >
              <img
                src={card.images?.small}
                alt={card.name}
                className="rounded-md w-full object-contain"
              />
              <p className="mt-2 text-xs text-gray-300">{card.name}</p>
            </div>
          ))}
        </div>
      )}

      <Pagination page={page} setPage={setPage} />

      <CardModal
        card={selectedCard}
        onClose={() => setSelectedCard(null)}
        onAddToCollection={onAddToCollection}
        onAddToDreamList={onAddToDreamList}
      />
    </div>
  );
}
