export default function CardModal({ card, onClose }) {
  if (!card) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 p-6 rounded-lg shadow-xl max-w-sm w-full text-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={card.image || "/vite.svg"}
          alt={card.name}
          className="h-48 w-48 mx-auto object-contain mb-4"
        />
        <h2 className="text-2xl font-bold text-blue-400">{card.name}</h2>
        {card.rarity && (
          <p className="text-gray-300 mt-2">Rarity: {card.rarity}</p>
        )}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}
