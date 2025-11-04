// src/components/CardForm.jsx
import { useState } from "react";

export default function CardForm({ onAdd }) {
  const [name, setName] = useState("");
  const [rarity, setRarity] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newCard = {
      id: Date.now(),
      name,
      rarity,
      image,
    };

    onAdd(newCard);
    setName("");
    setRarity("");
    setImage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col gap-3 max-w-md mx-auto mt-6"
    >
      <h3 className="text-lg font-semibold text-white">Add a New Card</h3>

      <input
        type="text"
        placeholder="Card Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        placeholder="Rarity (optional)"
        value={rarity}
        onChange={(e) => setRarity(e.target.value)}
        className="p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        placeholder="Image URL (optional)"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
      >
        Add Card
      </button>
    </form>
  );
}
