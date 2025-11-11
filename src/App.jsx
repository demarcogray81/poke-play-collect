import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/SideBar";
import MyCards from "./pages/MyCards";
import DreamList from "./pages/DreamList";
import Backup from "./pages/Backup";
import Footer from "./components/Footer";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import {
  getCollection,
  saveCollection,
  getDreamList,
  saveDreamList,
} from "./utils/storage";

export default function App() {
  const [collection, setCollection] = useState(getCollection());
  const [dreamList, setDreamList] = useState(getDreamList());

  useEffect(() => {
    saveCollection(collection);
    saveDreamList(dreamList);
  }, [collection, dreamList]);

  const addToCollection = (card) => {
    // prevent duplicates
    if (!collection.some((c) => c.id === card.id)) {
      const updated = [...collection, { ...card, owned: false }];
      setCollection(updated);
      saveCollection(updated);
    }
  };

  const addToDreamList = (card) => {
    if (!dreamList.some((c) => c.id === card.id)) {
      const updated = [...dreamList, card];
      setDreamList(updated);
      saveDreamList(updated);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content section */}
      <div className="flex flex-col flex-1">
        <Header />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  onAddToCollection={addToCollection}
                  onAddToDreamList={addToDreamList}
                />
              }
            />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/my-cards" element={<MyCards />} />
            <Route path="/dream-list" element={<DreamList />} />
            <Route path="/backup" element={<Backup />} />
            <Route path="*" element={<MyCards />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </div>
  );
}
