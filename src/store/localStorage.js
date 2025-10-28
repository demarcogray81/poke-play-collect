const COLLECTION_KEY = "ppc:mycards:v1";

export function getSavedCards() {
  const data = localStorage.getItem(COLLECTION_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveCard(card) {
  const cards = getSavedCards();
  if (!cards.find((c) => c.id === card.id)) {
    cards.push(card);
    localStorage.setItem(COLLECTION_KEY, JSON.stringify(cards));
  }
}

export function removeCard(id) {
  const cards = getSavedCards().filter((c) => c.id !== id);
  localStorage.setItem(COLLECTION_KEY, JSON.stringify(cards));
}
