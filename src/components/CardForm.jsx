import { useEffect, useState } from "react";
import { fetchTCGCardByName, fetchTCGCardNames } from "../utils/tcgapi";

export default function CardForm({ onAdd }) {
  const [name, setName] = useState("");
  const [rarity, setRarity] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadNames = async () => {
      const names = await fetchTCGCardNames();
      setSuggestions(names);
    };
    loadNames();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter a card name!");
      return;
    }

    setLoading(true);

    const fetched = await fetchTCGCardByName(name);

    const finalImage =
      fetched?.images?.large ||
      fetched?.images?.small ||
      imageUrl ||
      "/vite.svg";

    const finalRarity = fetched?.rarity || rarity || "Unknown";

    const cardToSave = {
      id: crypto.randomUUID(),
      name,
      rarity: finalRarity,
      image: finalImage,
      owned: false,
    };

    onAdd(cardToSave);

    setName("");
    setRarity("");
    setImageUrl("");
    setLoading(false);
  };

  const filteredSuggestions = suggestions
    .filter((s) => s.toLowerCase().includes(name.toLowerCase()))
    .slice(0, 5);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-md mx-auto"
    >
      <h3 className="text-lg font-semibold mb-3">Add a New Card</h3>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Card Name"
        className="w-full mb-2 p-2 rounded bg-gray-700 text-white"
        list="card-names"
      />

      <datalist id="card-names">
        {filteredSuggestions.map((s) => (
          <option key={s} value={s} />
        ))}
      </datalist>

      <input
        type="text"
        value={rarity}
        onChange={(e) => setRarity(e.target.value)}
        placeholder="Rarity (optional)"
        className="w-full mb-2 p-2 rounded bg-gray-700 text-white"
      />

      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image URL (optional)"
        className="w-full mb-2 p-2 rounded bg-gray-700 text-white"
      />

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      {loading && (
        <p className="text-gray-400 text-sm mb-2">Fetching card info...</p>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded transition-colors"
      >
        Add Card
      </button>
    </form>
  );
}
