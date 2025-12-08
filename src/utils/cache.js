const TTL = 24 * 60 * 60 * 1000;

export function cacheWrite(key, data) {
  const payload = {
    time: Date.now(),
    data,
  };
  localStorage.setItem(key, JSON.stringify(payload));
}

export function cacheRead(key) {
  const raw = localStorage.getItem(key);
  if (!raw) return null;

  try {
    const { time, data } = JSON.parse(raw);

    if (Date.now() - time > TTL) {
      localStorage.removeItem(key);
      return null;
    }

    return data;
  } catch (err) {
    console.warn("Cache read error:", err);
    localStorage.removeItem(key);
    return null;
  }
}

export function cacheClear(prefix = "tcg:") {
  Object.keys(localStorage)
    .filter((k) => k.startsWith(prefix))
    .forEach((k) => localStorage.removeItem(k));
}
