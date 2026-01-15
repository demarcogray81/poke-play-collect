import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import PokelogFull from "../assets/pokelog-logo.svg";
import PokelogIcon from "../assets/pokelog-logo-only.svg";
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

export default function Sidebar({
  loggedIn,
  onLogout,
  mobileOpen,
  setMobileOpen,
}) {
  const [collapsed, setCollapsed] = useState(false);

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(max-width: 429px)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(max-width: 429px)");
    const handleChange = (event) => setIsMobile(event.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!isMobile) setMobileOpen(false);
  }, [isMobile, setMobileOpen]);

  const isCollapsed = !isMobile && collapsed;

  const sidebarWidth = isMobile ? "w-0" : isCollapsed ? "w-16" : "w-56";
  const sidebarHeight = isMobile ? "h-0" : "h-screen";

  const closeMobile = () => isMobile && setMobileOpen(false);

  const shouldShowLabels = isMobile ? true : !isCollapsed;

  const navLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${linkBase} ${isActive ? active : inactive}`
        }
        onClick={closeMobile}
        title={isCollapsed ? "Home" : undefined}
      >
        <span className="w-5 flex justify-center text-gray-300 group-hover:text-white">
          <IconHome />
        </span>
        {shouldShowLabels && <span>Home</span>}
      </NavLink>

      {loggedIn && (
        <>
          <NavLink
            to="/my-cards"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
            onClick={closeMobile}
            title={isCollapsed ? "Collection" : undefined}
          >
            <span className="w-5 flex justify-center text-gray-300 group-hover:text-white">
              <IconFolder />
            </span>
            {shouldShowLabels && <span>Collection</span>}
          </NavLink>

          <NavLink
            to="/dream-list"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
            onClick={closeMobile}
            title={isCollapsed ? "Dream List" : undefined}
          >
            <span className="w-5 flex justify-center text-gray-300 group-hover:text-white">
              <IconStar />
            </span>
            {shouldShowLabels && <span>Dream List</span>}
          </NavLink>

          {shouldShowLabels && (
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
              <IconChart />
            </span>
            {shouldShowLabels && <span>Trends</span>}
          </button>

          <NavLink
            to="/backup"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
            onClick={closeMobile}
            title={isCollapsed ? "Backup" : undefined}
          >
            <span className="w-5 flex justify-center text-gray-300 group-hover:text-white">
              <IconSave />
            </span>
            {shouldShowLabels && <span>Backup</span>}
          </NavLink>

          <button
            type="button"
            disabled
            className={`${linkBase} opacity-50 cursor-not-allowed text-gray-300`}
            title="Playthroughs coming soon"
          >
            <span className="w-5 flex justify-center text-gray-300 group-hover:text-white">
              <IconGame />
            </span>
            {shouldShowLabels && <span>Playthroughs</span>}
          </button>

          <button
            type="button"
            onClick={() => {
              onLogout();
              closeMobile();
            }}
            className={`${linkBase} w-full text-gray-300`}
            title={isCollapsed ? "Log Out" : undefined}
          >
            <span className="w-5 flex justify-center text-gray-300 group-hover:text-white">
              <IconLogout />
            </span>
            {shouldShowLabels && <span>Log Out</span>}
          </button>
        </>
      )}
    </>
  );
  return (
    <>
      <aside
        className={`sticky top-0 self-start bg-gray-900 border-r border-gray-800 flex flex-col transition-all duration-300 ${sidebarWidth} ${sidebarHeight}`}
      >
        {!isMobile && (
          <div className="flex items-center justify-center pt-6">
            {isCollapsed ? (
              <img
                src={PokelogIcon}
                alt="PokéLog Icon"
                className="scale-200 transition-all duration-300 ml-12"
              />
            ) : (
              <img
                src={PokelogFull}
                alt="PokéLog"
                className="transition-all duration-300 -mt-7"
              />
            )}
          </div>
        )}
        {!isMobile && (
          <nav className="flex-1 px-2 space-y-1 flex flex-col overflow-y-auto">
            {navLinks}
          </nav>
        )}

        {!isMobile && (
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="hidden min-[430px]:flex absolute -right-4 top-60 bg-gray-700 text-white rounded-full p-2 border border-gray-600 hover:bg-gray-600 transition"
          >
            {isCollapsed ? (
              <IconChevron direction="right" />
            ) : (
              <IconChevron direction="left" />
            )}
          </button>
        )}
      </aside>

      {isMobile && (
        <div
          className={`fixed inset-0 z-30 ${
            mobileOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className={`absolute inset-0 bg-black/50 transition-opacity ${
              mobileOpen ? "opacity-100" : "opacity-0"
            }`}
            aria-label="Close menu"
          />

          <div
            className={`absolute left-0 w-72 max-w-[85vw]
    top-[var(--mobile-header-h)] h-[calc(100%-var(--mobile-header-h))]
    bg-gray-900/40 backdrop-blur-md border-r border-white/10
    transform transition-transform duration-300
    ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            <nav
              className="px-2 space-y-1 flex flex-col overflow-y-auto h-full"
              style={{ paddingTop: "var(--mobile-header-h)" }}
            >
              {navLinks}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
