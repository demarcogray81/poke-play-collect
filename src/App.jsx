import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
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

function RequireAuth({ loggedIn, children }) {
  const location = useLocation();
  if (!loggedIn) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }
  return children;
}

export default function App() {
  const navigate = useNavigate();

  const [collection, setCollection] = useState(() => {
    ensureStorageVersion();
    return getCollection() || [];
  });
  const [dreamList, setDreamList] = useState(getDreamList() || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [homeCache, setHomeCache] = useState(() => ({ pages: {} }));
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const { loggedIn, user, signup, login, logout } = useAuth();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    saveCollection(collection);
    saveDreamList(dreamList);
  }, [collection, dreamList]);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

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
    <div className="flex h-screen bg-gray-900 text-white flex-col min-[430px]:flex-row overflow-hidden">
      <Sidebar
        loggedIn={loggedIn}
        onLogout={handleLogout}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header
          onSearch={setSearchTerm}
          onMenu={() => setMobileOpen((prev) => !prev)}
          mobileOpen={mobileOpen}
          loggedIn={loggedIn}
          user={user}
          onLogout={handleLogout}
        />

        <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden p-4 md:p-6">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  onAddToCollection={addToCollection}
                  onAddToDreamList={addToDreamList}
                  searchTerm={searchTerm}
                  homeCache={homeCache}
                  setHomeCache={setHomeCache}
                />
              }
            />

            <Route
              path="/signin"
              element={
                loggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <SignIn onSignIn={login} />
                )
              }
            />
            <Route
              path="/signup"
              element={
                loggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <SignUp onSignUp={signup} />
                )
              }
            />

            <Route
              path="/my-cards"
              element={
                <RequireAuth loggedIn={loggedIn}>
                  <MyCards
                    collection={collection}
                    setCollection={setCollection}
                    dreamList={dreamList}
                    setDreamList={setDreamList}
                  />
                </RequireAuth>
              }
            />

            <Route
              path="/dream-list"
              element={
                <RequireAuth loggedIn={loggedIn}>
                  <DreamList
                    collection={collection}
                    setCollection={setCollection}
                    dreamList={dreamList}
                    setDreamList={setDreamList}
                  />
                </RequireAuth>
              }
            />

            <Route
              path="/backup"
              element={
                <RequireAuth loggedIn={loggedIn}>
                  <Backup />
                </RequireAuth>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </div>
  );
}
