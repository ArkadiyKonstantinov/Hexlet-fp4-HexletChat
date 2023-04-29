import React, { useMemo, useState } from 'react';
import { AuthContext } from './index.jsx';

const AuthProvider = ({ children }) => {
  const currentUsername = JSON.parse(localStorage.getItem('userId'))?.username;
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState(currentUsername ?? null);

  const values = useMemo(() => {
    const logIn = (newUsername) => {
      setLoggedIn(true);
      setUsername(newUsername);
    };
    const logOut = () => {
      localStorage.removeItem('userId');
      setLoggedIn(false);
      setUsername(null);
    };

    const getAuthHeader = () => {
      const userId = JSON.parse(localStorage.getItem('userId'));
      if (userId && userId.token) {
        return { Authorization: `Bearer ${userId.token}` };
      }

      return {};
    };

    return {
      logIn,
      logOut,
      getAuthHeader,
      loggedIn,
      username,
    };
  }, [loggedIn, username]);

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;