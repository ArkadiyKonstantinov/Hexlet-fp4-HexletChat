import React, { useState, useCallback, useMemo } from "react";
import AuthContext from "../contexts/index.jsx";

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem("userId");
    setLoggedIn(false);
  };

  const getAuthHeader = () => {
    const userId = JSON.parse(localStorage.getItem("userId"));
    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }

    return {};
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut, getAuthHeader }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
