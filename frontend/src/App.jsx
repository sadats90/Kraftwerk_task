import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import AuthProvider from './context/AuthContext';
import AppRouter from './routes';

function App() {
  return (
    <Router> 
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </Router>
  );
}

export default App;
