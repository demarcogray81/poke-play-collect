export default function CardModal({ card, onClose }) {
  if (!card) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-gray-900 p-6 rounded-xl shadow-2xl text-center max-w-xl w-full">
        <img
          src={card.image || "/placeholder.jpg"}
          alt={card.name}
          className="mx-auto mb-4 rounded-lg shadow-lg max-h-[500px] w-auto object-contain"
        />

        <h3 className="text-2xl font-bold text-blue-400">{card.name}</h3>
        {card.rarity && (
          <p className="text-gray-400 mt-1">Rarity: {card.rarity}</p>
        )}
        <button
          onClick={onClose}
          className="mt-6 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
