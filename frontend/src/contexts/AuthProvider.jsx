import React, { useMemo, useState } from 'react';
import axios from 'axios';

import { AuthContext } from './index.jsx';
import routes from '../routes.js';

const AuthProvider = ({ children }) => {
  const currentUsername = JSON.parse(localStorage.getItem('userId'))?.username;
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState(currentUsername ?? null);

  const values = useMemo(() => {
    const logIn = async (loginData) => {
      const { data } = await axios.post(routes.loginPath(), loginData);
      localStorage.setItem('userId', JSON.stringify(data));
      setLoggedIn(true);
      setUsername(loginData.username);
    };

    const logOut = () => {
      localStorage.removeItem('userId');
      setLoggedIn(false);
      setUsername(null);
    };

    const signUp = async (signupData) => {
      const { data } = await axios.post(routes.signupPath(), signupData);
      localStorage.setItem('userId', JSON.stringify(data));
      setLoggedIn(true);
      setUsername(signupData.username);
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
      signUp,
      getAuthHeader,
      loggedIn,
      username,
    };
  }, [loggedIn, username]);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
