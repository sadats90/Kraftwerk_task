import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

// Protected route component to restrict access to authenticated users
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  // If the user is not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

// Main routing setup
const AppRouter = () => {
  return (
    <Routes>
      {/* Redirect the root URL to the login page */}
      <Route path="/" element={<Navigate to="/login" />} />
      
      {/* Login and Register routes accessible to all */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected Dashboard route, accessible only to authenticated users */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
