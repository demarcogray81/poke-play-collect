import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function Header({ onSearch }) {
  return (
    <header className="bg-gray-800 text-white py-4 px-6 flex items-center justify-between">
      <Link to="/" className="text-2xl font-bold text-blue-400">
        PokéLog
      </Link>

      <div className="flex-1 flex justify-center px-4">
        <div className="w-full max-w-lg">
          <SearchBar onSearch={onSearch} />
        </div>
      </div>

      <nav className="flex gap-4">
        <Link to="/my-cards" className="hover:text-blue-400 transition-colors">
          Collection
        </Link>
        <Link
          to="/dream-list"
          className="hover:text-blue-400 transition-colors"
        >
          Dream List
        </Link>
      </nav>
    </header>
  );
}
