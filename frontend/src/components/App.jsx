import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './Header.jsx';
import Page404 from './Page404.jsx';
import MainPage from './MainPage.jsx';
import LoginPage from './LoginPage.jsx';
import SingUpPage from './SingUpPage.jsx';
import { useAuth } from '../hooks/index.jsx';
import { routes } from '../routes.js';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return auth.loggedIn || auth.username !== null ? (
    children
  ) : (
    <Navigate to={routes.loginPage()} state={{ from: location }} />
  );
};

const App = () => {
  return (
    <div className="d-flex flex-column h-100">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path={routes.mainPage()}
            element={(
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
              )
            }
          />
          <Route path={routes.loginPage()} element={<LoginPage />} />
          <Route path={routes.signUpPage()} element={<SingUpPage />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default App;
