import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search cards..."
        className="w-full max-w-md px-4 py-2 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
      />
    </div>
  );
}
