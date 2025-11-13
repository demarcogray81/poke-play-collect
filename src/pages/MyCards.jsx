// src/pages/MyCards.jsx
import { useEffect, useState } from "react";
import {
  getCollection,
  saveCollection,
  getDreamList,
  saveDreamList,
} from "../utils/storage";
import CardForm from "../components/CardForm";
import CardGrid from "../components/CardGrid";
import CardModal from "../components/CardModal";
import { TYPE_FILTER_OPTIONS, matchesTypeFilter } from "../utils/cardFilters";

export default function MyCards() {
  const [collection, setCollection] = useState(getCollection());
  const [dreamList, setDreamList] = useState(getDreamList());
  const [selectedCard, setSelectedCard] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name-asc");
  const [rarityFilter, setRarityFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  useEffect(() => {
    saveCollection(collection);
    saveDreamList(dreamList);
  }, [collection, dreamList]);

  const addCard = (card) => setCollection([...collection, card]);

  const removeCard = (id) =>
    setCollection(collection.filter((card) => card.id !== id));

  const moveToDreamList = (id) => {
    const card = collection.find((c) => c.id === id);
    if (card) {
      setDreamList([...dreamList, { ...card, owned: false }]);
      removeCard(id);
    }
  };

  const toggleOwned = (id) => {
    setCollection(
      collection.map((card) =>
        card.id === id ? { ...card, owned: !card.owned } : card
      )
    );
  };

  const filtered = collection
    .filter((card) =>
      card.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((card) => {
      if (rarityFilter === "all") return true;
      if (!card.rarity) return false;
      return card.rarity.toLowerCase() === rarityFilter.toLowerCase();
    })
    .filter((card) => matchesTypeFilter(card, typeFilter));

  const sorted = [...filtered].sort((a, b) => {
    const nameA = a.name || "";
    const nameB = b.name || "";

    switch (sortOption) {
      case "name-asc":
        return nameA.localeCompare(nameB);
      case "name-desc":
        return nameB.localeCompare(nameA);
      case "owned-first":
        return (b.owned ? 1 : 0) - (a.owned ? 1 : 0);
      case "missing-first":
        return (a.owned ? 1 : 0) - (b.owned ? 1 : 0);
      default:
        return 0;
    }
  });

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-blue-500 mb-4">My Cards</h2>

      <CardForm onAdd={addCard} />

      {/* Filters to match Home layout */}
      <div className="mt-6 flex flex-wrap justify-center gap-3 mb-2">
        {/* Search (local to page, header search still global) */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search cards..."
          className="px-3 py-2 rounded bg-gray-800 text-white text-sm border border-gray-700 w-56"
        />

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="px-3 py-2 rounded bg-gray-800 text-white text-sm border border-gray-700"
        >
          <option value="name-asc">Name (A → Z)</option>
          <option value="name-desc">Name (Z → A)</option>
          <option value="owned-first">Owned First</option>
          <option value="missing-first">Missing First</option>
        </select>

        <select
          value={rarityFilter}
          onChange={(e) => setRarityFilter(e.target.value)}
          className="px-3 py-2 rounded bg-gray-800 text-white text-sm border border-gray-700"
        >
          <option value="all">All Rarities</option>
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
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-3 py-2 rounded bg-gray-800 text-white text-sm border border-gray-700"
        >
          {TYPE_FILTER_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <p className="text-gray-400 mt-1 text-sm">
        Showing {sorted.length} card{sorted.length !== 1 && "s"}
      </p>

      <CardGrid
        cards={sorted}
        onRemove={removeCard}
        onMove={moveToDreamList}
        onSelect={setSelectedCard}
        onToggleOwned={toggleOwned}
        moveLabel="Move to Dream List"
      />

      {/* Same CardModal style as Home */}
      <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} />
    </div>
  );
}
