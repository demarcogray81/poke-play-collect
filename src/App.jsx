import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";

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
  ensureStorageVersion,
  getCollection,
  saveCollection,
  getDreamList,
  saveDreamList,
} from "./utils/storage";

export default function App() {
  const [collection, setCollection] = useState(() => {
    ensureStorageVersion();
    return getCollection() || [];
  });
  const [dreamList, setDreamList] = useState(getDreamList() || []);
  const [searchTerm, setSearchTerm] = useState("");

  const { loggedIn, user, signup, login, logout } = useAuth();

  useEffect(() => {
    saveCollection(collection);
    saveDreamList(dreamList);
  }, [collection, dreamList]);

  const addToCollection = (card) => {
    setCollection((prev) => {
      if (prev.some((c) => c.id === card.id)) return prev;

      return [...prev, { ...card, owned: true }];
    });
  };

  const addToDreamList = (card) => {
    if (!dreamList.some((c) => c.id === card.id)) {
      const updated = [...dreamList, { ...card, owned: false }];
      setDreamList(updated);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white overflow-x-hidden">
      <Sidebar loggedIn={loggedIn} onLogout={logout} />

      <div className="flex flex-col flex-1 w-full">
        <Header
          onSearch={setSearchTerm}
          loggedIn={loggedIn}
          user={user}
          onLogout={logout}
        />

        <main className="flex-1 p-4 md:p-6">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  onAddToCollection={addToCollection}
                  onAddToDreamList={addToDreamList}
                  searchTerm={searchTerm}
                />
              }
            />

            <Route path="/signin" element={<SignIn onSignIn={login} />} />
            <Route path="/signup" element={<SignUp onSignUp={signup} />} />

            <Route
              path="/my-cards"
              element={
                <MyCards
                  collection={collection}
                  setCollection={setCollection}
                  dreamList={dreamList}
                  setDreamList={setDreamList}
                />
              }
            />

            <Route
              path="/dream-list"
              element={
                <DreamList
                  collection={collection}
                  setCollection={setCollection}
                  dreamList={dreamList}
                  setDreamList={setDreamList}
                />
              }
            />

            <Route path="/backup" element={<Backup />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </div>
  );
}
