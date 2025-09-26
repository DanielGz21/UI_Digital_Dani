// src/pages/Login.jsx
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(formData.email, formData.password);
    if (success) {
      navigate('/'); // Redirige a la página principal si el login es exitoso
    } else {
      setError('Credenciales inválidas. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        {/* ... (campos del formulario) ... */}
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
          Entrar
        </button>
      </form>
       <p className="text-center mt-4">
        ¿No tienes una cuenta? <Link to="/registro" className="text-primary hover:underline">Regístrate</Link>
      </p>
    </div>
  );
}

export default Login;