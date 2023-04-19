import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Page404 from './components/Page404.jsx';
import MainPage from './components/MainPage.jsx'
import LoginPage from './components/LoginPage.jsx';
import useAuth from './hooks/index.jsx';
import AuthContext from './contexts/index.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => {
  return (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Page404 />} />
        <Route path='/' element={(
          <PrivateRoute>
            <MainPage />
          </PrivateRoute>
        )} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
  );
}

export default App;
