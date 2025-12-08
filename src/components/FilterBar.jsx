import { useState } from "react";

export default function FilterBar({
  searchTerm,
  filterRarity,
  filterOwned,
  sortOption,
  onSearch,
  onFilterRarity,
  onShowOwned,
  onSort,
  onReset,
}) {
  return (
    <div
      className="flex flex-col md:flex-row items-center justify-between gap-3
                    bg-gray-800 p-4 rounded-lg shadow-md mb-6"
    >
      <input
        type="text"
        placeholder="Search cards..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full md:w-1/3 px-3 py-2 rounded bg-gray-700 text-white"
      />

      <select
        value={filterRarity}
        onChange={(e) => onFilterRarity(e.target.value)}
        className="px-3 py-2 rounded bg-gray-700 text-white"
      >
        <option value="">All Rarities</option>
        <option value="Common">Common</option>
        <option value="Uncommon">Uncommon</option>
        <option value="Rare">Rare</option>
        <option value="Double Rare">Double Rare</option>
        <option value="Illustration Rare">Illustration Rare</option>
        <option value="Special Illustration Rare">
          Special Illustration Rare
        </option>
        <option value="Ultra Rare">Ultra Rare</option>
        <option value="Secret Rare">Secret Rare</option>
      </select>

      <select
        value={filterOwned}
        onChange={(e) => onShowOwned(e.target.value)}
        className="px-3 py-2 rounded bg-gray-700 text-white"
      >
        <option value="all">All Cards</option>
        <option value="owned">Owned Only</option>
        <option value="missing">Missing Only</option>
      </select>

      <select
        value={sortOption}
        onChange={(e) => onSort(e.target.value)}
        className="px-3 py-2 rounded bg-gray-700 text-white"
      >
        <option value="name-asc">Name (A → Z)</option>
        <option value="name-desc">Name (Z → A)</option>
        <option value="rarity-asc">Rarity (Low → High)</option>
        <option value="rarity-desc">Rarity (High → Low)</option>
        <option value="owned-first">Owned First</option>
        <option value="missing-first">Missing First</option>
      </select>

      <button
        onClick={onReset}
        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
      >
        Reset
      </button>
    </div>
  );
}
