import React, { createContext, useEffect, useState } from "react";
import { viewAllnote } from "../api/notes";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [notes, setNotes] = useState([]);
  const [darkmode, setdarkMode] = useState(false);
  // Check if token is expired
  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      const currentTime = Date.now() / 1000; // in seconds
      return payload.exp < currentTime;
    } catch (err) {
      return true; // invalid token
    }
  };

  // Load and validate token on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      if (isTokenExpired(savedToken)) {
        localStorage.removeItem("token");
        setToken(""); // clear expired token from state
      } else {
        setToken(savedToken);
      }
    }
  }, []);

  // Fetch notes when valid token is set
  useEffect(() => {
    const fetchNotes = async () => {
      if (!token) return;

      const resp = await viewAllnote(token);
      if (resp.status === 200) {
        setNotes(resp.data.notes);
      }
    };

    fetchNotes();
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
