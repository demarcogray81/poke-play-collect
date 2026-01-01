import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function Header({ onSearch, loggedIn, user, onLogout }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initial = user?.email?.[0]?.toUpperCase() || "P";

  return (
    <header className="bg-gray-800 text-white py-4 px-4 sm:px-6 flex items-center justify-between shadow-md">
      {" "}
      <div className="hidden sm:block w-32" />
      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-lg">
          <SearchBar onSearch={onSearch} />
        </div>
      </div>
      <div
        className="w-auto sm:w-32 flex justify-end items-center relative"
        ref={menuRef}
      >
        {!loggedIn ? (
          <nav className="flex gap-3">
            <Link
              to="/signin"
              className="px-3 py-1 rounded-md bg-gray-700 hover:bg-gray-600 hover:text-white hover:scale-[1.03]text-xs font-semibold transition-colors duration-150"
            >
              Sign In
            </Link>

            <Link
              to="/signup"
              className="px-3 py-1 rounded-md bg-gray-700 hover:bg-gray-600 hover:text-white hover:scale-[1.03]text-xs font-semibold transition-colors duration-150"
            >
              Sign Up
            </Link>
          </nav>
        ) : (
          <div className="relative">
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-lg font-bold hover:bg-blue-500 transition"
            >
              {initial}
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-44 bg-gray-800 border border-gray-700 rounded-lg shadow-xl py-2 z-50 animate-fade-in">
                <div className="px-3 py-2 text-sm text-gray-300 border-b border-gray-700">
                  <p className="font-semibold text-white">Signed in as:</p>
                  <p className="text-blue-400 break-all">{user.email}</p>
                </div>

                <button
                  onClick={() => {
                    setOpen(false);
                    onLogout();
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-700 text-sm text-red-400 font-semibold transition"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
