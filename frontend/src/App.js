import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Students from './components/Students';
import Manage from './components/Manage';
import Login from './components/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = (adminId) => {
    localStorage.setItem("adminId", adminId);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminId");
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      {isAuthenticated && <Navigation onLogout={handleLogout} />}
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/home" replace />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
        <Route
          path="/home"
          element={
            isAuthenticated ? <Home /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/students"
          element={
            isAuthenticated ? <Students /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/manage"
          element={
            isAuthenticated ? <Manage /> : <Navigate to="/" replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
