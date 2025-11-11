import { useEffect, useState } from "react";
import { fetchTCGCards } from "../utils/tcgapi";
import CardModal from "../components/CardModal";

export default function Home({ onAddToCollection, onAddToDreamList }) {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedCard, setSelectedCard] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCards = async () => {
      setLoading(true);
      const data = await fetchTCGCards(page);
      setCards(data);
      setLoading(false);
    };
    loadCards();
  }, [page]);

  return (
    <div className="text-center p-4">
      <h2 className="text-3xl font-bold text-blue-500 mb-4">
        Pokémon TCG Explorer
      </h2>

      {/* Cards Grid */}
      {loading ? (
        <p className="text-gray-400">Loading cards...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => setSelectedCard(card)}
              className="bg-gray-800 p-3 rounded-lg shadow-md cursor-pointer hover:scale-105 transition"
            >
              <img
                src={card.images?.small}
                alt={card.name}
                className="w-full h-auto rounded"
              />
              <p className="mt-2 text-sm font-semibold text-white">
                {card.name}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 gap-4">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50"
        >
          ← Previous
        </button>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Next →
        </button>
      </div>

      {/* Fullscreen Modal */}
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
