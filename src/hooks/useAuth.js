import { useEffect, useState } from "react";

const AUTH_CREDENTIALS_KEY = "pokelog_auth_credentials";
const AUTH_USER_KEY = "pokelog_auth_user";
const AUTH_LOGGED_IN_KEY = "pokelog_auth_logged_in";

export default function useAuth() {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(AUTH_USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [loggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem(AUTH_LOGGED_IN_KEY) === "true";
  });

  useEffect(() => {
    if (loggedIn && user) {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
      localStorage.setItem(AUTH_LOGGED_IN_KEY, "true");
    } else {
      localStorage.setItem(AUTH_LOGGED_IN_KEY, "false");
      localStorage.removeItem(AUTH_USER_KEY);
    }
  }, [loggedIn, user]);

  const signup = async (email, password) => {
    const creds = { email, password };

    localStorage.setItem(AUTH_CREDENTIALS_KEY, JSON.stringify(creds));

    const newUser = { email };
    setUser(newUser);
    setLoggedIn(true);
  };

  const login = async (email, password) => {
    const raw = localStorage.getItem(AUTH_CREDENTIALS_KEY);
    if (!raw) {
      throw new Error("No account found. Please sign up first.");
    }

    let saved;
    try {
      saved = JSON.parse(raw);
    } catch {
      throw new Error("Something went wrong. Please sign up again.");
    }

    if (saved.email !== email || saved.password !== password) {
      throw new Error("Invalid email or password.");
    }

    const nextUser = { email };
    setUser(nextUser);
    setLoggedIn(true);
  };

  const logout = () => {
    setLoggedIn(false);
    setUser(null);
  };

  return { loggedIn, user, signup, login, logout };
}
