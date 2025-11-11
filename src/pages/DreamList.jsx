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
import ConfirmModal from "../components/ConfirmModal";

export default function DreamList() {
  const [dreamList, setDreamList] = useState(getDreamList());
  const [collection, setCollection] = useState(getCollection());
  const [selectedCard, setSelectedCard] = useState(null);
  const [confirmData, setConfirmData] = useState({
    open: false,
    action: null,
    cardId: null,
  });

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
      setCollection([...collection, card]);
      removeCard(id);
    }
  };

  const handleConfirm = () => {
    if (confirmData.action === "delete") removeCard(confirmData.cardId);
    if (confirmData.action === "move") moveToCollection(confirmData.cardId);
    setConfirmData({ open: false, action: null, cardId: null });
  };

  const handleCancel = () =>
    setConfirmData({ open: false, action: null, cardId: null });

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-blue-500 mb-4">Dream List</h2>
      <p className="text-gray-400 mb-4">
        Cards you’d love to own someday — add them here to keep track!
      </p>
      <CardForm onAdd={addCard} />

      <CardGrid
        cards={dreamList}
        onRemove={(id) =>
          setConfirmData({ open: true, action: "delete", cardId: id })
        }
        onMove={(id) =>
          setConfirmData({ open: true, action: "move", cardId: id })
        }
        moveLabel="Move to Collection"
        onSelect={setSelectedCard}
      />

      <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} />

      <ConfirmModal
        isOpen={confirmData.open}
        title={
          confirmData.action === "delete"
            ? "Delete Card?"
            : "Move to Collection?"
        }
        message={
          confirmData.action === "delete"
            ? "Are you sure you want to delete this card from your Dream List?"
            : "Mark this card as owned and move it to your Collection?"
        }
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
}
