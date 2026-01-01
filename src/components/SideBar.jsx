import { useState } from "react";
import { NavLink } from "react-router-dom";
import pokelogFull from "../assets/pokelog-logo.png";
import pokelogIcon from "../assets/pokelog-logo-only.svg";
import {
  IconHome,
  IconFolder,
  IconStar,
  IconChart,
  IconSave,
  IconGame,
  IconLogout,
  IconChevron,
} from "./icons";

const linkBase =
  "group flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors duration-150";
const inactive = "text-gray-300 hover:bg-gray-800 hover:text-white";
const active = "bg-blue-600 text-white hover:bg-blue-500";

export default function Sidebar({ loggedIn, onLogout }) {
  const [collapsed, setCollapsed] = useState(false);

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
        type="button"
        onClick={() => setCollapsed((c) => !c)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="absolute -right-4 top-60 bg-gray-700 text-white rounded-full p-2 border border-gray-600 hover:bg-gray-600 transition"
      >
        {collapsed ? (
          <IconChevron direction="right" />
        ) : (
          <IconChevron direction="left" />
        )}
      </button>

      <nav className="flex-1 px-2 py-2 space-y-1">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? active : inactive}`
          }
        >
          <span className="w-5 flex justify-center text-gray-300 group-hover:text-white">
            {" "}
            <IconHome />
          </span>
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
              <span className="w-5 flex justify-center text-gray-300 group-hover:text-white">
                {" "}
                <IconFolder />
              </span>
              {!collapsed && <span>Collection</span>}
            </NavLink>

            <NavLink
              to="/dream-list"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? active : inactive}`
              }
            >
              <span className="w-5 flex justify-center text-gray-300 group-hover:text-white">
                {" "}
                <IconStar />
              </span>
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
              className={`${linkBase} opacity-50 cursor-not-allowed text-gray-300`}
              title="Coming soon"
            >
              <span className="w-5 flex justify-center text-gray-300 group-hover:text-white">
                {" "}
                <IconChart />
              </span>
              {!collapsed && <span>Trends</span>}
            </button>

            <NavLink
              to="/backup"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? active : inactive}`
              }
            >
              <span className="w-5 flex justify-center text-gray-300 group-hover:text-white">
                {" "}
                <IconSave />
              </span>
              {!collapsed && <span>Backup</span>}
            </NavLink>

            <button
              type="button"
              disabled
              className={`${linkBase} opacity-50 cursor-not-allowed text-gray-300`}
              title="Playthroughs coming soon"
            >
              <span className="w-5 flex justify-center text-gray-300 group-hover:text-white">
                {" "}
                <IconGame />
              </span>
              {!collapsed && <span>Playthroughs</span>}
            </button>

            <button
              type="button"
              onClick={onLogout}
              className="group flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors duration-150 w-full text-gray-300"
            >
              <span className="w-5 flex justify-center text-gray-300 group-hover:text-white">
                <IconLogout />
              </span>
              {!collapsed && (
                <span className="group-hover:text-white transition-colors">
                  Log Out
                </span>
              )}
            </button>
          </>
        )}
      </nav>
    </aside>
  );
}
