// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { login as loginService } from '../services/api';

// 1. Creamos el contexto
export const AuthContext = createContext();

// 2. Creamos el "Proveedor" del contexto
// Este componente envolverá nuestra aplicación y proveerá el estado de autenticación.
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  useEffect(() => {
    // Si el token cambia, actualizamos el estado de autenticación
    setIsAuthenticated(!!token);
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await loginService({ email, password });
      const { token } = response.data;
      localStorage.setItem('token', token); // Guardamos el token en el almacenamiento local
      setToken(token);
      return true; // Éxito
    } catch (error) {
      console.error('Error en el login:', error);
      return false; // Fracaso
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  // 3. Pasamos el estado y las funciones a los componentes hijos
  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};