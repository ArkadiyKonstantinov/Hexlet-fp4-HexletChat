import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Page404 from "./Page404.jsx";
import MainPage from "./MainPage.jsx";
import LoginPage from "./LoginPage.jsx";
import useAuth from "../hooks/index.jsx";

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return auth.loggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => {
  return (
    <div className="d-flex flex-column h-100">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Page404 />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
