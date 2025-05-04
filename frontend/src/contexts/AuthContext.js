import React, { createContext, useState, useEffect } from 'react';
import api from '../api';

export const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem('user');
    if (u) setUser(JSON.parse(u));
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    setUser(res.data.user);
  };

  const signup = async (username, email, password) => {
    try {
      console.debug('Signup initiated with:', { username, email });
      const res = await api.post('/auth/signup', { username, email, password });
      console.debug('Signup response:', res.data);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);
    } catch (error) {
      console.error('Signup failed:', error.response ? error.response.data : error.message);
      throw error; // Re-throw the error to handle it in the calling function if needed
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
