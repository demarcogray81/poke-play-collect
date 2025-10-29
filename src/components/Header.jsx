import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  const navLink = (path, label) => (
    <Link
      to={path}
      className={`px-3 py-2 rounded-md text-sm md:text-base transition-colors ${
        location.pathname === path
          ? "bg-blue-600 text-white"
          : "text-gray-300 hover:bg-blue-600 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <header className="flex flex-col md:flex-row md:items-center md:justify-between bg-gray-800 px-6 py-4 shadow-lg gap-2 md:gap-0">
      <div className="flex items-center gap-3">
        <img src="/vite.svg" alt="Logo" className="h-8 w-8" />
        <h1 className="text-xl font-bold text-white tracking-wide">PokéLog</h1>
      </div>
      <nav className="flex gap-2">
        {navLink("/my-cards", "Collection")}
        {navLink("/dream-list", "Dream List")}
      </nav>
    </header>
  );
}
