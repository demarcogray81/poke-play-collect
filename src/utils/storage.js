// --- Constants for localStorage keys ---
const COLLECTION_KEY = "poke_collection";
const DREAM_LIST_KEY = "poke_dream_list";

// --- Save data to localStorage ---
export function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error("Error saving to localStorage:", err);
  }
}

// --- Load data from localStorage ---
export function loadFromStorage(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Error loading from localStorage:", err);
    return [];
  }
}

// --- Getters for each list ---
export const getCollection = () => loadFromStorage(COLLECTION_KEY);
export const getDreamList = () => loadFromStorage(DREAM_LIST_KEY);

// --- Setters for each list ---
export const saveCollection = (data) => saveToStorage(COLLECTION_KEY, data);
export const saveDreamList = (data) => saveToStorage(DREAM_LIST_KEY, data);
