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

export default function MyCards() {
  const [collection, setCollection] = useState(getCollection());
  const [dreamList, setDreamList] = useState(getDreamList());
  const [selectedCard, setSelectedCard] = useState(null);

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

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-blue-500 mb-4">My Cards</h2>
      <CardForm onAdd={addCard} />
      <CardGrid
        cards={collection}
        onRemove={removeCard}
        onMove={moveToDreamList}
        onSelect={setSelectedCard}
        onToggleOwned={toggleOwned}
      />
      <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} />
    </div>
  );
}
