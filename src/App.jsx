import { Routes, Route } from "react-router-dom";
import Cards from "./pages/Cards";
import MyCards from "./pages/MyCards";
import DreamList from "./pages/DreamList";
import "./index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      <main className="flex-1 flex items-center justify-center p-6">
        <Routes>
          <Route path="/cards" element={<Cards />} />
          <Route path="/my-cards" element={<MyCards />} />
          <Route path="*" element={<MyCards />} />
          <Route path="/dream-list" element={<DreamList />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
