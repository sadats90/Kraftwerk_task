import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../api/auth';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const data = await login(credentials);
      setUser(data.user);
      setIsAuthenticated(true);
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error.response.data.message);
    }
  };

  const handleRegister = async (userData) => {
    try {
      const data = await register(userData);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error.response.data.message);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, handleLogin, handleRegister, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
