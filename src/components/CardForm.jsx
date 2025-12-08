import { useEffect, useState } from "react";
import { fetchTCGCardByName, fetchTCGCardNames } from "../utils/tcgapi";

export default function CardForm({ onAdd }) {
  const [name, setName] = useState("");
  const [rarity, setRarity] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    async function loadNames() {
      try {
        const names = await fetchTCGCardNames();
        setSuggestions(names);
      } catch (err) {
        if (import.meta.env.DEV) {
          console.warn(
            "Could not load card name suggestions from TCG API. You can still type names manually.",
            err
          );
        }
        setSuggestions([]);
      }
    }
    loadNames();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter a card name.");
      return;
    }

    setLoading(true);

    let fetched = null;

    try {
      fetched = await fetchTCGCardByName(name);
    } catch (err) {
      console.error("Search error:", err);
    }
    if (!fetched && !imageUrl.trim()) {
      setLoading(false);
      setError(
        "Couldn't fetch this card from the TCG API. Please check the name or paste an image URL manually."
      );
      return;
    }

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
    setShowSuggestions(false);
  };

  const filteredSuggestions = suggestions
    .filter(
      (s) =>
        name &&
        s.toLowerCase().startsWith(name.toLowerCase()) &&
        s.toLowerCase() !== name.toLowerCase()
    )
    .slice(0, 30);

  const handleSuggestionClick = (value) => {
    setName(value);
    setShowSuggestions(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-md mx-auto"
    >
      <h3 className="text-lg font-semibold mb-3">Add a New Card</h3>

      <div className="relative mb-2">
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => {
            if (filteredSuggestions.length > 0) setShowSuggestions(true);
          }}
          onBlur={() => {
            setTimeout(() => setShowSuggestions(false), 100);
          }}
          placeholder="Card Name"
          className="w-full p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute left-0 right-0 mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg max-h-48 overflow-y-auto z-20">
            {filteredSuggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => handleSuggestionClick(s)}
                className="block w-full text-left px-3 py-1.5 hover:bg-gray-700 text-sm"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      <input
        type="text"
        value={rarity}
        onChange={(e) => setRarity(e.target.value)}
        placeholder="Rarity (optional)"
        className="w-full mb-2 p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
      />

      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image URL (optional)"
        className="w-full mb-2 p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
      />

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      {loading && <p className="text-gray-400 text-sm mb-2">Searching…</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded transition-colors"
      >
        Add Card
      </button>
    </form>
  );
}
