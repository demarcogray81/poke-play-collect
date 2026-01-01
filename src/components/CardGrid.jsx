import CardItem from "./CardItem";

export default function CardGrid({
  cards,
  onRemove,
  onSelect,
  onToggleOwned,
  onMove,
  moveLabel = "Move",
}) {
  if (!cards || cards.length === 0) return null;

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4 max-w-6xl mx-auto">
      {cards.map((card) => {
        const owned = card.owned;

        return (
          <li key={card.id} className="mx-auto w-full max-w-[220px]">
            <article
              className={`bg-gray-900 rounded-lg border ${
                owned
                  ? "border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]"
                  : "border-gray-700/80"
              } hover:border-blue-500/70 transition-colors flex flex-col`}
            >
              <CardItem
                card={card}
                owned={owned}
                onClick={() => onSelect && onSelect(card)}
                className="bg-transparent hover:bg-transparent shadow-none"
              />

              <div className="mt-2 px-3 pb-3 flex flex-col gap-2">
                {onToggleOwned && (
                  <button
                    type="button"
                    onClick={() => onToggleOwned(card.id)}
                    className={`w-full py-1 rounded text-xs font-semibold ${
                      owned
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-amber-600 hover:bg-amber-700"
                    }`}
                  >
                    {owned ? "Owned" : "Missing"}
                  </button>
                )}

                <div className="flex flex-col sm:flex-row gap-2">
                  {onMove && (
                    <button
                      type="button"
                      onClick={() => onMove(card)}
                      className="flex-1 py-1 rounded bg-blue-600 hover:bg-blue-700 text-xs"
                    >
                      {moveLabel}
                    </button>
                  )}

                  {onRemove && (
                    <button
                      type="button"
                      onClick={() => onRemove(card.id)}
                      className="flex-1 py-1 rounded bg-red-600 hover:bg-red-700 text-xs"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
