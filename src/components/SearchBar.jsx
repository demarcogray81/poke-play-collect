import { useEffect, useRef, useState } from "react";

export default function SearchBar({ onSearch, onMenu, menuOpen }) {
  const [query, setQuery] = useState("");
  const timerRef = useRef(null);

  const fireSearch = (value) => onSearch?.(value);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => fireSearch(value), 350);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (timerRef.current) clearTimeout(timerRef.current);
    fireSearch(query);
  };

  useEffect(() => {
    return () => timerRef.current && clearTimeout(timerRef.current);
  }, []);

  return (
    <form onSubmit={handleSubmit} role="search" className="w-full">
      <label htmlFor="card-search" className="sr-only">
        Search cards
      </label>

      <div className="relative">
        {onMenu && (
          <button
            type="button"
            onClick={onMenu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-md
                       bg-transparent border-none backdrop-blur-sm
                       hover:bg-white/10 transition min-[430px]:hidden"
          >
            {menuOpen ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                className="mx-auto"
              >
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg
                width="18"
                height="12"
                viewBox="0 0 20 14"
                className="mx-auto"
              >
                <path
                  d="M1 1h18M1 7h18M1 13h18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        )}

        <input
          id="card-search"
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search cards..."
          className={`w-full px-4 py-2 pr-10 rounded-md bg-gray-700 text-white placeholder-gray-300 border border-gray-600
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                      ${onMenu ? "pl-12" : ""}`}
        />

        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-600"
          aria-label="Search"
          title="Search"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 21l-4.3-4.3m1.8-5.2a7 7 0 11-14 0 7 7 0 0114 0z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}
