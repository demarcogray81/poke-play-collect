export default function CardGrid({ cards, onRemove, onMove, onSelect }) {
  if (!cards.length) {
    return <p className="text-gray-400">No cards added yet.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
      {cards.map((card) => (
        <div
          key={card.id}
          className="bg-gray-800 border border-gray-700 rounded-lg p-3 flex flex-col items-center text-center hover:shadow-lg hover:border-blue-500 transition cursor-pointer"
          onClick={() => onSelect(card)}
        >
          <img
            src={card.image || "/vite.svg"}
            alt={card.name}
            className="h-24 w-24 object-contain mb-2"
          />
          <h3 className="font-semibold text-white">{card.name}</h3>
          {card.rarity && (
            <p className="text-sm text-gray-400 mt-1">{card.rarity}</p>
          )}

          <div className="flex gap-2 mt-2">
            {onMove && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMove(card.id);
                }}
                className="px-3 py-1 text-sm bg-blue-600 rounded hover:bg-blue-700"
              >
                Move
              </button>
            )}
            {onRemove && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(card.id);
                }}
                className="px-3 py-1 text-sm bg-red-600 rounded hover:bg-red-700"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
