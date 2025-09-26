// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/api';

function Register() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/login'); // Redirige al login después de un registro exitoso
    } catch (err) {
      setError(err.response?.data?.msg || 'Error al registrarse');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6">Crear una Cuenta</h2>
      <form onSubmit={handleSubmit}>
        {/* ... (campos del formulario) ... */}
         <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
            Nombre de Usuario
          </label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Correo Electrónico
          </label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-blue-700">
          Registrarse
        </button>
      </form>
      <p className="text-center mt-4">
        ¿Ya tienes una cuenta? <Link to="/login" className="text-primary hover:underline">Inicia Sesión</Link>
      </p>
    </div>
  );
}

export default Register;