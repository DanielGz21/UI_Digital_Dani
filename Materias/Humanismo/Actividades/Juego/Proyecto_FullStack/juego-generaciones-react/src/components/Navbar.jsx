// src/components/Navbar.jsx
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          Generaciones 🎮
        </Link>
        <ul className="flex items-center space-x-8 text-lg">
          {/* 3. Añadimos el enlace destacado para el Museo 3D */}
          <li><Link to="/museo" className="font-bold text-secondary hover:text-primary transition-colors">Museo 3D</Link></li>
          <li className="relative" onMouseLeave={() => setIsMenuOpen(false)}>
            <button onMouseEnter={() => setIsMenuOpen(true)} className="text-gray-700 hover:text-primary transition-colors">
              Juegos
            </button>
            {isMenuOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md p-2 w-48 z-10">
                <Link to="/juego" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Trivia</Link>
                <Link to="/dilema" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Dilema</Link>
              </div>
            )}
          </li>
          <li><Link to="/linea-de-tiempo" className="text-gray-700 hover:text-primary transition-colors">Línea de Tiempo</Link></li>
          <li><Link to="/generaciones" className="text-gray-700 hover:text-primary transition-colors">Explorar</Link></li>
          <li><Link to="/acerca-de" className="text-gray-700 hover:text-primary transition-colors">Acerca de</Link></li>
          
          {isAuthenticated ? (
            <>
              <li><Link to="/perfil" className="font-bold text-gray-700 hover:text-primary transition-colors">Perfil</Link></li>
              <li><button onClick={logout} className="font-bold text-red-500 hover:underline">Cerrar Sesión</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="bg-primary text-white font-bold py-2 px-6 rounded-full hover:bg-blue-700 transition-transform hover:scale-105">Iniciar Sesión</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;