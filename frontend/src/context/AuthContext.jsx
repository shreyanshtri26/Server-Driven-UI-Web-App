import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set default base URL for axios
  axios.defaults.baseURL = 'http://localhost:5000';

  // Load user
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const res = await axios.get('/api/user', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          setUser(res.data);
          setIsAuthenticated(true);
        } catch (err) {
          localStorage.removeItem('token');
          setToken(null);
          setIsAuthenticated(false);
          setError('Authentication failed');
        }
      }
      setLoading(false);
    };
    
    loadUser();
  }, [token]);
  
  // Login user
  const login = async (email, password) => {
    try {
      console.log('Attempting login with:', { email });
      
      const res = await axios.post('http://localhost:5000/api/login', { email, password });
      
      // Make sure we're getting the token
      console.log('Login response received:', res);
      
      // Ensure we're extracting the token correctly
      const token = res.data.token;
      
      if (!token) {
        console.error('No token received in response');
        setError('Authentication failed - no token received');
        return false;
      }
      
      console.log('Token received successfully');
      
      // Store token and update state
      localStorage.setItem('token', token);
      setToken(token);
      setIsAuthenticated(true);
      setError(null);
      
      // Load user data immediately after login
      await loadUser(token);
      
      return true;
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed');
      return false;
    }
  };
  
  // Register user
  const register = async (name, email, password) => {
    try {
      console.log('Attempting registration with:', { name, email });
      
      const res = await axios.post('/api/register', { name, email, password });
      
      console.log('Registration response:', res.data);
      
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setIsAuthenticated(true);
      setError(null);
      return true;
    } catch (err) {
      console.error('Registration error:', err);
      console.error('Error response:', err.response?.data);
      
      setError(err.response?.data?.message || 'Registration failed. Check the console for details.');
      return false;
    }
  };
  
  // Logout
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };
  
  // Add a separate loadUser function
  const loadUser = async (currentToken) => {
    // Use the passed token or the stored token
    const tokenToUse = currentToken || token;
    
    if (!tokenToUse) {
      console.log('No token available to load user');
      return;
    }
    
    try {
      const res = await axios.get('http://localhost:5000/api/user', {
        headers: {
          Authorization: `Bearer ${tokenToUse}`
        }
      });
      
      console.log('User data loaded:', res.data);
      setUser(res.data);
    } catch (err) {
      console.error('Error loading user data:', err);
      // Don't log out on error to avoid login loops
    }
  };
  
  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        user,
        loading,
        error,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 