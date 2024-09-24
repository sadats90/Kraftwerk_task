import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


const useAuth = () => {
  const { user, isAuthenticated, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

 
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login'); 
    }
  }, [isAuthenticated, navigate]);

  return { user, isAuthenticated, handleLogout };
};

export default useAuth;
