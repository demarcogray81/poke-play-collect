import { useEffect, useState } from "react";
import { getCollection, saveCollection } from "../utils/storage";

export default function MyCards() {
  const [collection, setCollection] = useState(getCollection());

  useEffect(() => {
    saveCollection(collection);
  }, [collection]);

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-blue-500 mb-2">My Cards</h2>
      <p className="text-gray-400 mb-4">
        This is where your saved collection will go.
      </p>
      <button
        className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        onClick={() =>
          setCollection([...collection, { id: Date.now(), name: "Test Card" }])
        }
      >
        Add Test Card
      </button>
      <ul className="mt-4 space-y-2">
        {collection.map((card) => (
          <li key={card.id} className="text-gray-200">
            {card.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
