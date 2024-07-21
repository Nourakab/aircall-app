import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { UserContext, UserProvider } from "./context/UserContext";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage/HomePage";

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

const WrappedApp = () => (
  <UserProvider>
    <App />
  </UserProvider>
);

export default WrappedApp;
