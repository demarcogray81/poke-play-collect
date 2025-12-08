import { useMemo, useState } from "react";
import CardForm from "../components/CardForm";
import CardGrid from "../components/CardGrid";
import CardModal from "../components/CardModal";
import { TYPE_FILTER_OPTIONS, matchesTypeFilter } from "../utils/cardFilters";

export default function MyCards({
  collection,
  setCollection,
  dreamList,
  setDreamList,
}) {
  const [selectedCard, setSelectedCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name-asc");
  const [rarityFilter, setRarityFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [pendingAction, setPendingAction] = useState(null);

  const addCard = (card) => {
    const withOwned = { ...card, owned: true };
    setCollection([...collection, withOwned]);
  };

  const removeCard = (id) => {
    setCollection(collection.filter((card) => card.id !== id));
  };

  const moveToDreamList = (card) => {
    if (!dreamList.some((c) => c.id === card.id)) {
      setDreamList([...dreamList, { ...card, owned: false }]);
    }
    setCollection(collection.filter((c) => c.id !== card.id));
  };

  const toggleOwned = (id) => {
    setCollection(
      collection.map((card) =>
        card.id === id ? { ...card, owned: !card.owned } : card
      )
    );
  };

  const openConfirm = (message, action) => {
    setConfirmText(message);
    setPendingAction(() => action);
    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    if (pendingAction) pendingAction();
    setConfirmOpen(false);
    setPendingAction(null);
  };

  const handleCancel = () => {
    setConfirmOpen(false);
    setPendingAction(null);
  };

  const sorted = useMemo(() => {
    let result = [...collection];

    result = result.filter((card) =>
      (card.name || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (rarityFilter !== "all") {
      result = result.filter(
        (card) =>
          card.rarity &&
          card.rarity.toLowerCase() === rarityFilter.toLowerCase()
      );
    }

    result = result.filter((card) => matchesTypeFilter(card, typeFilter));

    result.sort((a, b) => {
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

    return result;
  }, [collection, searchTerm, rarityFilter, typeFilter, sortOption]);

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-blue-500 mb-4">My Cards</h2>

      <CardForm onAdd={addCard} />

      <div className="mt-6 flex flex-wrap justify-center gap-3 mb-2">
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
        onSelect={setSelectedCard}
        onToggleOwned={(id) =>
          openConfirm("Toggle owned status for this card?", () =>
            toggleOwned(id)
          )
        }
        onMove={(card) =>
          openConfirm("Move this card to your Dream List?", () =>
            moveToDreamList(card)
          )
        }
        onRemove={(id) =>
          openConfirm("Delete this card from your Collection?", () =>
            removeCard(id)
          )
        }
        moveLabel="Move to Dream List"
      />

      <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} />

      {confirmOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-4 max-w-sm w-full shadow-lg">
            <p className="text-sm text-gray-100 mb-4">{confirmText}</p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-sm"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
