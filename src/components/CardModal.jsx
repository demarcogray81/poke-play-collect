export default function CardModal({
  card,
  onClose,
  onAddToCollection,
  onAddToDreamList,
}) {
  if (!card) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-gray-900 p-6 rounded-xl shadow-2xl text-center max-w-2xl w-full">
        <img
          src={card.images?.large || "/placeholder.jpg"}
          alt={card.name}
          className="mx-auto mb-4 rounded-lg shadow-lg max-h-[70vh] w-auto object-contain"
        />
        <h3 className="text-2xl font-bold text-blue-400">{card.name}</h3>
        <p className="text-gray-400 mt-2">Rarity: {card.rarity || "Unknown"}</p>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => {
              onAddToCollection(card);
              onClose();
            }}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg"
          >
            Add to Collection
          </button>
          <button
            onClick={() => {
              onAddToDreamList(card);
              onClose();
            }}
            className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg"
          >
            Add to Dream List
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-6 px-5 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
}
