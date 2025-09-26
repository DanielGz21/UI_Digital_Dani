// src/pages/Museum.jsx
import React, { useState, useContext } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Scene3D } from '../components/Scene3D';
import AiChat from '../components/AiChat';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const exhibits = {
  nokia: {
    id: 'nokia',
    title: 'Nokia 3310 (2000)',
    description: 'Famoso por su resistencia, batería duradera y el adictivo juego "Snake II".',
    generation: 'Gen X / Millennials',
    modelPath: '/models/nokia-3310.glb',
    position: [-5, 1, -5],
    scale: 0.1,
    link: '/juego'
  },
  gameboy: {
    id: 'gameboy',
    title: 'Nintendo Game Boy (1989)',
    description: 'Revolucionó el entretenimiento portátil y definió la infancia de millones de Millennials.',
    generation: 'Millennials',
    modelPath: '/models/game-boy-classic.glb',
    position: [7.5, 1, 0],
    scale: 0.08,
    link: '/dilema'
  },
  vhs: {
    id: 'vhs',
    title: 'Cinta VHS (80s-90s)',
    description: 'El formato dominante para ver películas en casa. Rebobinar era un ritual para la Generación X.',
    generation: 'Generación X',
    modelPath: '/models/vhs-tape.glb',
    position: [5, 1, -5],
    scale: 0.5,
    link: '/linea-de-tiempo'
  }
};

export default function Museum() {
  const { isAuthenticated } = useContext(AuthContext);
  const [selectedExhibit, setSelectedExhibit] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isPointerLockActive, setIsPointerLockActive] = useState(false);
  const navigate = useNavigate();

  const handleExhibitClick = (exhibitId) => {
    if (selectedExhibit && selectedExhibit.id === exhibitId) {
      setSelectedExhibit(null);
    } else {
      setSelectedExhibit(exhibits[exhibitId]);
    }
  };
  
  const handleGuideClick = () => {
    if (isAuthenticated) {
      setIsChatOpen(true);
    } else {
      alert('Por favor, inicia sesión para hablar con nuestro guía virtual.');
      navigate('/login');
    }
  };

  const handleStartMuseum = () => {
    setIsPointerLockActive(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold mb-4">Museo Virtual 3D</h1>
        
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-8 max-w-3xl mx-auto text-left" role="alert">
          <p className="font-bold">¡Explora e Interactúa!</p>
          <p>Usa <kbd className="font-sans bg-gray-200 p-1 rounded">W</kbd> <kbd className="font-sans bg-gray-200 p-1 rounded">A</kbd> <kbd className="font-sans bg-gray-200 p-1 rounded">S</kbd> <kbd className="font-sans bg-gray-200 p-1 rounded">D</kbd> para caminar y haz clic en los objetos para ver su historia.</p>
        </div>
        
        {/* Renderiza un botón para entrar o la escena 3D */}
        {!isPointerLockActive ? (
          <div className="h-[600px] flex flex-col items-center justify-center bg-gray-800 rounded-lg shadow-inner">
            <h2 className="text-white text-3xl mb-4">Haz clic para entrar al museo</h2>
            <button
              onClick={handleStartMuseum}
              className="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors"
            >
              Entrar
            </button>
          </div>
        ) : (
          <Scene3D 
            exhibits={Object.values(exhibits)} 
            onExhibitClick={handleExhibitClick}
            onGuideClick={handleGuideClick}
            selectedExhibit={selectedExhibit}
          />
        )}
      </motion.div>
      
      <AnimatePresence>
        {isChatOpen && <AiChat closeChat={() => setIsChatOpen(false)} />}
      </AnimatePresence>
    </>
  );
}