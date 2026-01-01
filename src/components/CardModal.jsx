import { useEffect } from "react";

export default function CardModal({
  card,
  onClose,
  onAddToCollection,
  onAddToDreamList,
  onMoveToCollection,
  onMoveToDreamList,
  onDelete,
}) {
  useEffect(() => {
    if (!card) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [card, onClose]);

  if (!card) return null;

  const imageSrc =
    card.imageUrl ||
    card.image ||
    card.images?.large ||
    card.images?.small ||
    "https://archives.bulbagarden.net/media/upload/3/36/Poké_Ball_artwork.png";

  const setName = card.set?.name;
  const setSymbol = card.set?.images?.symbol;

  const hasPrimaryAction =
    onMoveToCollection || onMoveToDreamList || onAddToCollection;

  const primaryLabel = onMoveToCollection
    ? "Move to Collection"
    : onMoveToDreamList
    ? "Move to Dream List"
    : "Add to Collection";

  const handlePrimaryAction = () => {
    if (onMoveToCollection) {
      onMoveToCollection(card);
    } else if (onMoveToDreamList) {
      onMoveToDreamList(card);
    } else if (onAddToCollection) {
      onAddToCollection(card);
    }
    onClose();
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(card.id);
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-gray-900 text-white rounded-xl 
                   p-6 md:p-8 w-[95%] md:w-[80%] max-w-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute top-3 right-3 text-gray-300 hover:text-white p-2"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="w-full flex justify-center mb-4">
          <div className="w-full max-w-[460px]">
            <img
              src={imageSrc}
              alt={card.name}
              className="rounded-lg object-contain w-full max-h-[70vh]"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {(setName || setSymbol) && (
          <div className="flex items-center justify-center gap-2 mb-2 text-xs text-gray-300">
            {setSymbol && (
              <img
                src={setSymbol}
                alt={setName ? `${setName} set symbol` : "Set symbol"}
                className="w-6 h-6 object-contain"
              />
            )}
            {setName && (
              <span className="uppercase tracking-wide">{setName}</span>
            )}
          </div>
        )}

        <h2 className="text-2xl md:text-3xl font-bold text-center mt-1">
          {card.name}
        </h2>
        <p className="text-gray-400 text-center mb-5 text-sm md:text-base">
          {card.rarity || "Unknown Rarity"}
        </p>

        <div className="flex flex-col gap-3">
          {hasPrimaryAction && (
            <button
              className="bg-blue-500 hover:bg-blue-600 py-2.5 md:py-3 rounded-lg text-sm md:text-base"
              onClick={handlePrimaryAction}
            >
              {primaryLabel}
            </button>
          )}

          {onAddToDreamList && !onMoveToCollection && !onMoveToDreamList && (
            <button
              className="bg-pink-500 hover:bg-pink-600 py-2.5 md:py-3 rounded-lg text-sm md:text-base"
              onClick={() => {
                onAddToDreamList(card);
                onClose();
              }}
            >
              Add to Dream List
            </button>
          )}

          {onDelete && (
            <button
              className="bg-red-600 hover:bg-red-700 py-2.5 md:py-3 rounded-lg text-sm md:text-base"
              onClick={handleDelete}
            >
              Delete Card
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
