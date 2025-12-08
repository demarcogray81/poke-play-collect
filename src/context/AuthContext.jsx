import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const USER_KEY = "ppc:user";
const SESSION_KEY = "ppc:session";

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = localStorage.getItem(SESSION_KEY);
    const savedUser = localStorage.getItem(USER_KEY);

    if (session && savedUser) {
      setLoggedIn(true);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const signup = (email, password) => {
    const newUser = { email, password };

    localStorage.setItem(USER_KEY, JSON.stringify(newUser));
    localStorage.setItem(SESSION_KEY, "active");

    setUser(newUser);
    setLoggedIn(true);
  };

  const login = (email, password) => {
    const saved = JSON.parse(localStorage.getItem(USER_KEY));

    if (!saved) return false;
    if (saved.email !== email || saved.password !== password) return false;

    localStorage.setItem(SESSION_KEY, "active");
    setUser(saved);
    setLoggedIn(true);

    return true;
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
