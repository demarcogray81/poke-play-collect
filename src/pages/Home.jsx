import { useEffect, useMemo, useRef, useState } from "react";
import { fetchTrendingCards, searchCardsByName } from "../utils/tcgapi";
import CardModal from "../components/CardModal";
import CardItem from "../components/CardItem";

export default function Home({
  onAddToCollection,
  onAddToDreamList,
  searchTerm = "",
  homeCache,
  setHomeCache,
}) {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  const PAGE_SIZE = 4;
  const q = searchTerm.trim();
  const isSearching = q.length >= 2;

  const cachedPage = useMemo(
    () => homeCache?.pages?.[page] || null,
    [homeCache?.pages, page]
  );
  const didLoadPageRef = useRef(new Set());

  useEffect(() => {
    let ignore = false;

    async function load() {
      setError("");
      setLoading(true);

      try {
        if (isSearching) {
          const results = await searchCardsByName(q);
          if (!ignore) setCards(results);
          return;
        }

        if (cachedPage?.length) {
          if (!ignore) setCards(cachedPage);
          return;
        }

        if (didLoadPageRef.current.has(page)) return;

        const data = await fetchTrendingCards(page, PAGE_SIZE);
        if (ignore) return;

        didLoadPageRef.current.add(page);
        setCards(data);

        setHomeCache((prev) => ({
          ...(prev || {}),
          pages: { ...(prev?.pages || {}), [page]: data },
        }));
      } catch (err) {
        console.error("Failed to load cards", err);
        if (!ignore) setError("Couldn’t load cards right now.");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [page, cachedPage, setHomeCache, isSearching, q]);

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-blue-500 mt-4">
        {isSearching
          ? `Search Results${q ? `: "${q}"` : ""}`
          : "Recently Released Cards"}
      </h2>

      {!isSearching && (
        <p className="text-gray-400 mb-4">
          Page {page} — Powered by the Pokémon TCG API
        </p>
      )}

      {loading && <p className="text-gray-400 animate-pulse">Loading…</p>}
      {!loading && error && (
        <p className="text-red-400 text-sm mt-4 max-w-md mx-auto">{error}</p>
      )}

      {!loading && !error && (
        <>
          {isSearching && cards.length === 0 ? (
            <p className="text-gray-400 mt-6">No matches found.</p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-3">
              {cards.map((card) => (
                <li key={card.id}>
                  <CardItem card={card} onClick={() => setSelectedCard(card)} />
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {!isSearching && (
        <div className="flex justify-center gap-4 mb-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-4 py-2 rounded text-white bg-gray-800 hover:bg-gray-700 disabled:opacity-40"
          >
            Previous
          </button>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 rounded text-white bg-gray-800 hover:bg-gray-700"
          >
            Next
          </button>
        </div>
      )}

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
