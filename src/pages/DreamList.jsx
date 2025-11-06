import { useEffect, useState } from "react";
import {
  getDreamList,
  saveDreamList,
  getCollection,
  saveCollection,
} from "../utils/storage";
import CardForm from "../components/CardForm";
import CardGrid from "../components/CardGrid";
import CardModal from "../components/CardModal";

export default function DreamList() {
  const [dreamList, setDreamList] = useState(getDreamList());
  const [collection, setCollection] = useState(getCollection());
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    saveDreamList(dreamList);
    saveCollection(collection);
  }, [dreamList, collection]);

  const addCard = (card) => setDreamList([...dreamList, card]);

  const removeCard = (id) =>
    setDreamList(dreamList.filter((card) => card.id !== id));

  const moveToCollection = (id) => {
    const card = dreamList.find((c) => c.id === id);
    if (card) {
      setCollection([...collection, { ...card, owned: true }]);
      removeCard(id);
    }
  };

  const toggleOwned = (id) => {
    setDreamList((prevList) =>
      prevList.map((card) =>
        card.id === id ? { ...card, owned: !card.owned } : card
      )
    );

    const toggledCard = dreamList.find((c) => c.id === id);
    if (toggledCard && !toggledCard.owned) {
      moveToCollection(id);
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-blue-500 mb-4">Dream List</h2>
      <p className="text-gray-400 mb-4">
        Cards you’d love to own someday — add them here to keep track!
      </p>
      <CardForm onAdd={addCard} />
      <CardGrid
        cards={dreamList}
        onRemove={removeCard}
        onMove={moveToCollection}
        onSelect={setSelectedCard}
        onToggleOwned={toggleOwned}
      />
      <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} />
    </div>
  );
}
