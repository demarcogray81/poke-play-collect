import { useEffect, useState } from "react";
import { getDreamList, saveDreamList } from "../utils/storage";

export default function DreamList() {
  const [dreamList, setDreamList] = useState(getDreamList());

  useEffect(() => {
    saveDreamList(dreamList);
  }, [dreamList]);

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-blue-500 mb-2">Dream List</h2>
      <p className="text-gray-400 mb-4">Cards you’d love to have someday.</p>
      <button
        className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        onClick={() =>
          setDreamList([...dreamList, { id: Date.now(), name: "Dream Card" }])
        }
      >
        Add Dream Card
      </button>
      <ul className="mt-4 space-y-2">
        {dreamList.map((card) => (
          <li key={card.id} className="text-gray-200">
            {card.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
