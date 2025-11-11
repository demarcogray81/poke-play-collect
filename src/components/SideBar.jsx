import { useState } from "react";
import { NavLink } from "react-router-dom";
import pokelogFull from "../assets/pokelog-logo.svg"; // full logo (with text)
import pokelogIcon from "../assets/pokelog-logo-only.svg"; // icon-only version

const linkBase =
  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors";
const inactive = "text-gray-300 hover:bg-gray-700";
const active = "bg-blue-600 text-white";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`relative bg-gray-900 border-r border-gray-800 h-screen flex flex-col transition-all duration-300 ${
        collapsed ? "w-16" : "w-56"
      }`}
    >
      {/* Logo area */}
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

      {/* Collapse button (kept same position & styling) */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-60 bg-gray-700 text-white rounded-full px-2 py-1 text-xs border border-gray-600 hover:bg-gray-600 transition"
      >
        {collapsed ? ">" : "<"}
      </button>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-2 space-y-1">
        {/* Home */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? active : inactive}`
          }
        >
          <span>{collapsed ? "🏠" : "🏠 Home"}</span>
        </NavLink>

        {/* Collection */}
        <NavLink
          to="/my-cards"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? active : inactive}`
          }
        >
          <span>{collapsed ? "📁" : "📁 Collection"}</span>
        </NavLink>

        {/* Dream List */}
        <NavLink
          to="/dream-list"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? active : inactive}`
          }
        >
          <span>{collapsed ? "⭐" : "⭐ Dream List"}</span>
        </NavLink>

        {/* “Soon” label */}
        {!collapsed && (
          <div className="mt-4 text-xs uppercase tracking-wide text-gray-500 px-2">
            Soon
          </div>
        )}

        {/* Trends (disabled) */}
        <button
          type="button"
          disabled
          className={`${linkBase} ${inactive} opacity-50 cursor-not-allowed`}
          title="Coming soon"
        >
          <span>{collapsed ? "📊" : "📊 Trends"}</span>
        </button>

        {/* Backup */}
        <NavLink
          to="/backup"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? active : inactive}`
          }
        >
          <span>{collapsed ? "💾" : "💾 Backup"}</span>
        </NavLink>
      </nav>
    </aside>
  );
}
