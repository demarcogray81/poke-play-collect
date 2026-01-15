import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import PokelogFull from "../assets/pokelog-logo.svg";

export default function Header({
  onSearch,
  onMenu,
  mobileOpen,
  loggedIn,
  user,
  onLogout,
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const setVar = () => {
      const h = el.getBoundingClientRect().height;
      document.documentElement.style.setProperty(
        "--mobile-header-h",
        `${Math.ceil(h)}px`
      );
    };

    setVar();

    const ro = new ResizeObserver(setVar);
    ro.observe(el);

    window.addEventListener("resize", setVar);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", setVar);
    };
  }, []);

  const initial = user?.email?.[0]?.toUpperCase() || "P";

  return (
    <header className="sticky top-0 z-40 bg-gray-800 text-white shadow-md">
      <div
        ref={headerRef}
        className="flex items-center justify-between px-3 py-2"
      >
        <div className="flex items-center min-[430px]:hidden">
          <img
            src={PokelogFull}
            alt="PokéLog"
            className="h-14 w-auto object-contain"
          />
        </div>

        <div className="hidden min-[430px]:block" />

        <div className="relative" ref={menuRef}>
          {!loggedIn ? (
            <div className="flex gap-2">
              <Link
                to="/signin"
                className="px-3 py-1 rounded-md bg-gray-700 hover:bg-gray-600 text-xs font-semibold"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-3 py-1 rounded-md bg-gray-700 hover:bg-gray-600 text-xs font-semibold"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <>
              <button
                onClick={() => setOpen((p) => !p)}
                className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-lg font-bold hover:bg-blue-500 transition"
                aria-label="Open profile menu"
              >
                {initial}
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-44 bg-gray-800 border border-gray-700 rounded-lg shadow-xl py-2 z-50">
                  <div className="px-3 py-2 text-sm text-gray-300 border-b border-gray-700">
                    <p className="font-semibold text-white">Signed in as:</p>
                    <p className="text-blue-400 break-all">{user.email}</p>
                  </div>

                  <button
                    onClick={() => {
                      setOpen(false);
                      onLogout();
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-700 text-sm text-red-400 font-semibold"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="px-3 pb-2">
        <SearchBar onSearch={onSearch} onMenu={onMenu} menuOpen={mobileOpen} />
      </div>
    </header>
  );
}
