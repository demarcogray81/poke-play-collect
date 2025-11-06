import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cards from "./pages/Cards";
import MyCards from "./pages/MyCards";
import DreamList from "./pages/DreamList";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header onSearch={setSearchTerm} />
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
