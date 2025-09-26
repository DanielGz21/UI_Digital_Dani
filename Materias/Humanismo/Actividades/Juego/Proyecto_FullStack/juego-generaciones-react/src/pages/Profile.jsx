// src/pages/Profile.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

function Profile() {
  const { token, logout } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      // Si no hay token, no podemos pedir el perfil, redirigimos al login.
      if (!token) {
        navigate('/login');
        return;
      }
      
      try {
        const apiClient = axios.create({
          baseURL: 'http://localhost:5001/api',
          headers: { Authorization: `Bearer ${token}` }
        });
        const response = await apiClient.get('/profile');
        setProfileData(response.data);
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
        // Si el token es inválido o expiró (error 401), cerramos la sesión.
        if (error.response && error.response.status === 401) {
          logout();
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, logout, navigate]);

  if (loading) {
    return <div className="text-center mt-20 text-xl">Cargando perfil...</div>;
  }

  if (!profileData) {
    return <div className="text-center mt-20 text-xl text-red-500">No se pudo cargar la información del perfil.</div>;
  }

  const { user, scores } = profileData;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl animate-fade-in">
      <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
        <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4 md:mb-0 md:mr-6">
          {user.username.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-800">{user.username}</h1>
          <p className="text-lg text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-500 mt-1">Miembro desde: {new Date(user.created_at).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Historial de Puntuaciones</h2>
        {scores.length > 0 ? (
          <div className="overflow-x-auto bg-gray-50 rounded-lg p-4">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600">Puntuación</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600">Fecha y Hora</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {scores.map((s, index) => (
                  <tr key={index}>
                    <td className="py-3 px-4 font-bold text-lg text-primary">{s.score} / 3</td>
                    <td className="py-3 px-4 text-gray-700">{new Date(s.played_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-8 bg-gray-100 p-6 rounded-lg">
            Aún no has jugado ninguna partida. ¡<a href="/juego" className="text-primary font-bold hover:underline">Juega tu primera partida</a> para ver tus resultados aquí!
          </p>
        )}
      </div>
    </div>
  );
}

export default Profile;