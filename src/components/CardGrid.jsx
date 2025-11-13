// src/components/CardGrid.jsx
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

export default function CardGrid({
  cards,
  onRemove,
  onMove,
  onSelect,
  onToggleOwned,
  moveLabel = "Move",
}) {
  const [confirmData, setConfirmData] = useState({
    open: false,
    action: null,
    cardId: null,
  });

  const handleConfirm = () => {
    if (confirmData.action === "delete" && onRemove) {
      onRemove(confirmData.cardId);
    }
    if (confirmData.action === "move" && onMove) {
      onMove(confirmData.cardId);
    }
    setConfirmData({ open: false, action: null, cardId: null });
  };

  const handleCancel = () =>
    setConfirmData({ open: false, action: null, cardId: null });

  if (!cards.length) {
    return <p className="text-gray-400">No cards added yet.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`bg-gray-800 hover:bg-gray-700 rounded-xl shadow-md cursor-pointer transition transform hover:scale-105 flex flex-col border ${
              card.owned ? "border-green-500" : "border-gray-700"
            }`}
            onClick={() => onSelect && onSelect(card)}
          >
            {/* Top: image + basic info (match Home) */}
            <div className="p-3 flex flex-col items-center">
              <img
                src={
                  card.imageUrl ||
                  card.image ||
                  card.images?.small ||
                  card.images?.large ||
                  "https://archives.bulbagarden.net/media/upload/3/36/Poké_Ball_artwork.png"
                }
                alt={card.name}
                className="rounded-md w-full h-40 object-contain mb-2"
              />
              <h3 className="text-sm font-semibold text-white line-clamp-1">
                {card.name}
              </h3>
              {card.rarity && (
                <p className="text-[11px] text-gray-300 mt-1">{card.rarity}</p>
              )}
            </div>

            {/* Bottom: actions */}
            <div className="mt-auto border-t border-gray-700 p-2 flex flex-col gap-2">
              {onToggleOwned && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleOwned(card.id);
                  }}
                  className={`w-full px-3 py-1 text-xs font-semibold rounded ${
                    card.owned
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-yellow-600 hover:bg-yellow-700"
                  }`}
                >
                  {card.owned ? "Owned" : "Missing"}
                </button>
              )}

              <div className="flex gap-2">
                {onMove && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setConfirmData({
                        open: true,
                        action: "move",
                        cardId: card.id,
                      });
                    }}
                    className="flex-1 px-3 py-1 text-xs bg-blue-600 rounded hover:bg-blue-700"
                  >
                    {moveLabel}
                  </button>
                )}
                {onRemove && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setConfirmData({
                        open: true,
                        action: "delete",
                        cardId: card.id,
                      });
                    }}
                    className="flex-1 px-3 py-1 text-xs bg-red-600 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <ConfirmModal
        isOpen={confirmData.open}
        title={
          confirmData.action === "delete" ? "Delete Card?" : `${moveLabel}?`
        }
        message={
          confirmData.action === "delete"
            ? "Are you sure you want to delete this card?"
            : `Are you sure you want to ${moveLabel.toLowerCase()}?`
        }
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
}
