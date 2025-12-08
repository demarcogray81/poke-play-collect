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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4 max-w-6xl mx-auto">
      {cards.map((card) => {
        const imgSrc =
          card.image ||
          card.imageUrl ||
          card.images?.small ||
          "https://archives.bulbagarden.net/media/upload/3/36/Poké_Ball_artwork.png";

        const owned = card.owned;

        return (
          <article
            key={card.id}
            className={`bg-gray-900 rounded-lg border ${
              owned
                ? "border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]"
                : "border-gray-700/80"
            } hover:border-blue-500/70 transition-colors flex flex-col max-w-[220px] mx-auto`}
          >
            <button
              type="button"
              onClick={() => onSelect && onSelect(card)}
              className="flex flex-col items-center p-3 pb-2 focus:outline-none"
            >
              <div className="w-full aspect-[2/3] rounded-md overflow-hidden bg-gray-950/40">
                <img
                  src={imgSrc}
                  alt={card.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="mt-2 text-center">
                <h3 className="text-xs font-semibold text-gray-100 truncate">
                  {card.name}
                </h3>
                <p className="text-[10px] text-gray-400">
                  {card.rarity || "Unknown Rarity"}
                </p>
              </div>
            </button>

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
        );
      })}
    </div>
  );
}
