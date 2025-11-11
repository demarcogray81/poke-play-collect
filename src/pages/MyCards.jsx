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
import FilterBar from "../components/FilterBar";

export default function MyCards() {
  const [collection, setCollection] = useState(getCollection());
  const [dreamList, setDreamList] = useState(getDreamList());
  const [selectedCard, setSelectedCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRarity, setFilterRarity] = useState("");
  const [filterOwned, setFilterOwned] = useState("all");
  const [sortOption, setSortOption] = useState("name-asc");
  const handleReset = () => {
    setSearchTerm("");
    setFilterRarity("");
    setFilterOwned("all");
    setSortOption("name-asc");
  };

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
      setDreamList([...dreamList, card]);
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

  const filteredCollection = collection.filter((card) => {
    const matchesSearch = card.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesRarity = filterRarity
      ? card.rarity.toLowerCase().includes(filterRarity.toLowerCase())
      : true;

    const matchesOwned =
      filterOwned === "owned"
        ? card.owned
        : filterOwned === "missing"
        ? !card.owned
        : true;

    return matchesSearch && matchesRarity && matchesOwned;
  });

  const sortedCollection = [...filteredCollection].sort((a, b) => {
    switch (sortOption) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);

      case "rarity-asc":
        return a.rarity.localeCompare(b.rarity);
      case "rarity-desc":
        return b.rarity.localeCompare(a.rarity);

      case "owned-first":
        return b.owned - a.owned;
      case "missing-first":
        return a.owned - b.owned;

      default:
        return 0;
    }
  });

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-blue-500 mb-4">My Cards</h2>

      <CardForm onAdd={addCard} />

      <FilterBar
        searchTerm={searchTerm}
        filterRarity={filterRarity}
        filterOwned={filterOwned}
        sortOption={sortOption}
        onSearch={setSearchTerm}
        onFilterRarity={setFilterRarity}
        onShowOwned={setFilterOwned}
        onSort={setSortOption}
        onReset={handleReset}
      />

      <p className="text-gray-400 mt-2 text-sm">
        Showing {sortedCollection.length} card
        {sortedCollection.length !== 1 && "s"}
      </p>

      <CardGrid
        cards={collection}
        onRemove={removeCard}
        onMove={moveToDreamList}
        onSelect={setSelectedCard}
        onToggleOwned={toggleOwned}
        moveLabel="Move to Dream List"
      />

      <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} />
    </div>
  );
}
