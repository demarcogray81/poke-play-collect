import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import pokelogFull from "../assets/pokelog-logo.png";
import pokelogIcon from "../assets/pokelog-logo-only.svg";

const linkBase =
  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors";
const inactive = "text-gray-300 hover:bg-gray-700";
const active = "bg-blue-600 text-white";

export default function Sidebar({ loggedIn, onLogout }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <aside
      className={`relative bg-gray-900 border-r border-gray-800 h-screen flex flex-col transition-all duration-300 ${
        collapsed ? "w-16" : "w-56"
      }`}
    >
      <div className="flex items-center justify-center py-6">
        {collapsed ? (
          <img
            src={pokelogIcon}
            alt="PokéLog Icon"
            className="scale-200 transition-all duration-300 ml-12"
          />
        ) : (
          <img
            src={pokelogFull}
            alt="PokéLog"
            className="transition-all duration-300 -mt-7"
          />
        )}
      </div>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-60 bg-gray-700 text-white rounded-full px-2 py-1 text-xs border border-gray-600 hover:bg-gray-600 transition"
      >
        {collapsed ? ">" : "<"}
      </button>

      <nav className="flex-1 px-2 py-2 space-y-1">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? active : inactive}`
          }
        >
          <span className="w-5 flex justify-center text-base">🏠</span>
          {!collapsed && <span>Home</span>}
        </NavLink>

        {loggedIn && (
          <>
            <NavLink
              to="/my-cards"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? active : inactive}`
              }
            >
              <span className="w-5 flex justify-center text-base">📁</span>
              {!collapsed && <span>Collection</span>}
            </NavLink>

            <NavLink
              to="/dream-list"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? active : inactive}`
              }
            >
              <span className="w-5 flex justify-center text-base">⭐</span>
              {!collapsed && <span>Dream List</span>}
            </NavLink>

            {!collapsed && (
              <div className="mt-4 text-xs uppercase tracking-wide text-gray-500 px-3">
                Soon
              </div>
            )}
            <button
              type="button"
              disabled
              className={`${linkBase} ${inactive} opacity-50 cursor-not-allowed`}
              title="Coming soon"
            >
              <span className="w-5 flex justify-center text-base">📊</span>
              {!collapsed && <span>Trends</span>}
            </button>

            <NavLink
              to="/backup"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? active : inactive}`
              }
            >
              <span className="w-5 flex justify-center text-base">💾</span>
              {!collapsed && <span>Backup</span>}
            </NavLink>

            <button
              type="button"
              disabled
              className={`${linkBase} ${inactive} opacity-50 cursor-not-allowed`}
              title="Playthroughs coming soon"
            >
              <span className="w-5 flex justify-center text-base">🎮</span>
              {!collapsed && <span>Playthroughs</span>}
            </button>
          </>
        )}
      </nav>
    </aside>
  );
}
