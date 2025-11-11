import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function Header({ onSearch }) {
  return (
    <header className="bg-gray-800 text-white py-4 px-6 flex items-center justify-between shadow-md">
      {/* Center search bar */}
      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-lg">
          <SearchBar onSearch={onSearch} />
        </div>
      </div>

      {/* Auth buttons */}
      <nav className="flex gap-3">
        <Link
          to="/signin"
          className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-sm font-semibold transition"
        >
          Sign In
        </Link>
        <Link
          to="/signup"
          className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-sm font-semibold transition"
        >
          Sign Up
        </Link>
      </nav>
    </header>
  );
}
