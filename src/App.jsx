import { Routes, Route, Link } from "react-router-dom";
import Playthroughs from "./pages/Playthroughs";
import Cards from "./pages/Cards";
import MyCards from "./pages/MyCards";
import "./index.css";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <header className="flex gap-4 p-4 bg-gray-800">
        <Link to="/play" className="hover:text-blue-400">
          Playthroughs
        </Link>
        <Link to="/cards" className="hover:text-blue-400">
          Cards
        </Link>
        <Link to="/my-cards" className="hover:text-blue-400">
          My Cards
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <Routes>
          <Route path="/play" element={<Playthroughs />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/my-cards" element={<MyCards />} />
          <Route path="*" element={<Playthroughs />} />
        </Routes>
      </main>
    </div>
  );
}
