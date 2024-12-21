import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Students from './components/Students';
import Manage from './components/Manage';
import Login from './components/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Handle login function, which will set the authentication state to true
  const handleLogin = (email, password) => {
    if (email === "admin@gmail.com" && password === "admin123") {
      setIsAuthenticated(true); // Set authenticated status to true
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <BrowserRouter>
      
      {isAuthenticated && <Navigation />}
      <Routes>
       
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/home" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

      
        <Route
          path="/home"
          element={
            isAuthenticated ? (
              <Home />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        
        <Route
          path="/students"
          element={
            isAuthenticated ? (
              <Students />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        
        <Route
          path="/manage"
          element={
            isAuthenticated ? (
              <Manage />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
