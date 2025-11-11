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
    if (confirmData.action === "delete") onRemove(confirmData.cardId);
    if (confirmData.action === "move") onMove(confirmData.cardId);
    setConfirmData({ open: false, action: null, cardId: null });
  };

  const handleCancel = () =>
    setConfirmData({ open: false, action: null, cardId: null });

  if (!cards.length) {
    return <p className="text-gray-400">No cards added yet.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`bg-gray-800 border ${
              card.owned ? "border-green-500" : "border-gray-700"
            } rounded-lg p-3 flex flex-col items-center text-center hover:shadow-lg transition cursor-pointer`}
            onClick={() => onSelect && onSelect(card)}
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

            <div className="flex flex-col gap-2 mt-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleOwned && onToggleOwned(card.id);
                }}
                className={`px-3 py-1 text-sm rounded font-semibold ${
                  card.owned
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-yellow-600 hover:bg-yellow-700"
                }`}
              >
                {card.owned ? "Owned" : "Missing"}
              </button>

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
                  className="px-3 py-1 text-sm bg-blue-600 rounded hover:bg-blue-700"
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
                  className="px-3 py-1 text-sm bg-red-600 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <ConfirmModal
        isOpen={confirmData.open}
        title={
          confirmData.action === "delete" ? "Delete Card?" : `${moveLabel}?` // 🆕 Uses dynamic label
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
