const COLLECTION_KEY = "poke_collection";
const DREAM_LIST_KEY = "poke_dream_list";

const STORAGE_VERSION = "1";
const VERSION_KEY = "poke_storage_version";

export function ensureStorageVersion() {
  try {
    const current = localStorage.getItem(VERSION_KEY);

    if (current !== STORAGE_VERSION) {
      console.warn(
        `[PokéLog] Storage version mismatch (have: ${current}, expected: ${STORAGE_VERSION}). Resetting saved data.`
      );

      localStorage.removeItem(COLLECTION_KEY);
      localStorage.removeItem(DREAM_LIST_KEY);

      localStorage.setItem(VERSION_KEY, STORAGE_VERSION);
    }
  } catch (err) {
    console.error("Error checking storage version:", err);
  }
}

export function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error("Error saving to localStorage:", err);
  }
}

export function loadFromStorage(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Error loading from localStorage:", err);
    return [];
  }
}

export const getCollection = () => loadFromStorage(COLLECTION_KEY);
export const getDreamList = () => loadFromStorage(DREAM_LIST_KEY);

export const saveCollection = (data) => saveToStorage(COLLECTION_KEY, data);
export const saveDreamList = (data) => saveToStorage(DREAM_LIST_KEY, data);
