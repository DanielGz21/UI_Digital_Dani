// src/services/api.js
import axios from 'axios';

// Creamos una instancia de axios con la URL base de nuestro backend.
// Esto nos ahorra tener que escribirla en cada petición.
const apiClient = axios.create({
  baseURL: '/api', // La URL de tu servidor backend
});

// Función para registrar un nuevo usuario
export const register = (userData) => {
  return apiClient.post('/auth/register', userData);
};

// Función para iniciar sesión
export const login = (credentials) => {
  return apiClient.post('/auth/login', credentials);
};

// Función para guardar una puntuación
// Necesita el token para saber qué usuario está guardando la puntuación.
export const saveScore = (score, token) => {
  return apiClient.post('/scores', { score }, {
    headers: {
      Authorization: `Bearer ${token}`, // Enviamos el token en la cabecera
    },
  });
};
