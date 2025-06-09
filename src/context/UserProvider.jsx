import React, { createContext, useEffect, useState } from "react";
import { viewAllnote } from "../api/notes";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [notes, setNotes] = useState([]);
  const [darkmode, setdarkMode] = useState(false);

  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch (err) {
      return true;
    }
  };

  useEffect(() => {
    const savedMode = localStorage.getItem("mode");
    if (savedMode !== null) {
      setdarkMode(savedMode === "true");
    }
  }, []);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      if (isTokenExpired(savedToken)) {
        localStorage.removeItem("token");
        setToken("");
      } else {
        setToken(savedToken);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const fetchNotes = async () => {
      try {
        const resp = await viewAllnote(token);
        if (resp.status === 200) {
          setNotes(resp.data.notes);
        }
      } catch (err) {
        if (e.name !== "AbortError") setNotes([]);
      }
    };
    if (token) fetchNotes();
    return () => controller.abort();
  }, [token]);

  return (
    <UserContext.Provider
      value={{ token, setToken, notes, setNotes, darkmode, setdarkMode }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
