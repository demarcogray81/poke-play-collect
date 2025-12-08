import { useEffect, useMemo, useState } from "react";
import { fetchTrendingCards } from "../utils/tcgapi";
import CardModal from "../components/CardModal";

export default function Home({ onAddToCollection, onAddToDreamList }) {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  const [rarityFilter, setRarityFilter] = useState("");
  const [sortOption, setSortOption] = useState("name-asc");

  useEffect(() => {
    let ignore = false;

    async function load() {
      setLoading(true);
      setError("");

      try {
        const data = await fetchTrendingCards(page, 24);
        if (!ignore) {
          setCards(data);
        }
      } catch (err) {
        console.error("Failed to load trending cards:", err);
        if (!ignore) {
          setCards([]);
          setError(
            "Couldn’t load trending cards from the Pokémon TCG API. You can still use your Collection and Dream List as normal."
          );
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [page]);

  const filtered = useMemo(() => {
    let result = [...cards];

    if (rarityFilter) {
      result = result.filter(
        (c) => c.rarity?.toLowerCase() === rarityFilter.toLowerCase()
      );
    }

    result.sort((a, b) => {
      if (sortOption === "name-asc") return a.name.localeCompare(b.name);
      if (sortOption === "name-desc") return b.name.localeCompare(a.name);
      if (sortOption === "rarity-asc")
        return (a.rarity || "").localeCompare(b.rarity || "");
      if (sortOption === "rarity-desc")
        return (b.rarity || "").localeCompare(a.rarity || "");
      return 0;
    });

    return result;
  }, [cards, rarityFilter, sortOption]);

  console.log("Cards loaded:", cards.length);
  console.log("Filtered:", filtered.length);

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-blue-500 mt-4">
        New &amp; Trending Cards
      </h2>
      <p className="text-gray-400 mb-4">
        Page {page} — Powered by the Pokémon TCG API
      </p>

      <div className="flex justify-center gap-4 mb-4">
        <button
          disabled={page === 1}
          className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-40 disabled:cursor-default"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Previous
        </button>

        <button
          className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-40 disabled:cursor-default"
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>

      {loading && <p className="text-gray-400 animate-pulse">Loading cards…</p>}

      {!loading && error && (
        <p className="text-red-400 text-sm mt-4 max-w-md mx-auto">{error}</p>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 p-3">
          {filtered.map((card) => (
            <div
              key={card.id}
              className="bg-gray-800 hover:bg-gray-700 rounded-lg px-3 pt-3 pb-2 shadow transition"
              onClick={() => setSelectedCard(card)}
            >
              <img
                src={card.images?.small}
                alt={card.name}
                loading="lazy"
                decoding="async"
                className="rounded-md w-full max-h-100 object-contain"
              />
              <p className="mt-2 text-xs text-gray-300 truncate text-center">
                {card.name}
              </p>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center gap-4 mb-4">
        <button
          disabled={page === 1}
          className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-40 disabled:cursor-default"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Previous
        </button>

        <button
          className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-40 disabled:cursor-default"
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>

      {selectedCard && (
        <CardModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
          onAddToCollection={onAddToCollection}
          onAddToDreamList={onAddToDreamList}
        />
      )}
    </div>
  );
}
