// src/pages/Dilemma.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

function Dilemma() {
  const [dilemmas, setDilemmas] = useState([]);
  const [currentDilemmaIndex, setCurrentDilemmaIndex] = useState(0);
  const [selectedSolution, setSelectedSolution] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDilemmas = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/dilemmas');
        setDilemmas(response.data);
      } catch (error) {
        console.error("Error al obtener los dilemas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDilemmas();
  }, []);

  const handleSelectSolution = (solution) => {
    setSelectedSolution(solution);
  };
  
  const handleNext = () => {
    setSelectedSolution(null);
    setCurrentDilemmaIndex(prev => (prev + 1) % dilemmas.length);
  }

  if (loading) return <div className="text-center mt-20">Cargando dilemas...</div>;
  if (dilemmas.length === 0) return <div className="text-center mt-20">No se encontraron dilemas.</div>;

  const currentDilemma = dilemmas[currentDilemmaIndex];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Dilema Generacional</h1>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentDilemmaIndex}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-2xl shadow-xl"
        >
          {/* Muestra el resultado si se ha seleccionado una solución */}
          {selectedSolution ? (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800">Resultado ({selectedSolution.generation})</h3>
              <p className="text-lg mt-4 text-gray-700">{selectedSolution.outcome}</p>
              <p className="text-xl font-bold mt-4">Eficiencia: <span className="text-primary">{selectedSolution.efficiency}</span></p>
              <button onClick={handleNext} className="mt-8 bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700">
                {currentDilemmaIndex === dilemmas.length - 1 ? 'Volver a Empezar' : 'Siguiente Dilema'}
              </button>
            </div>
          ) : (
            <div>
              <p className="text-lg font-semibold text-gray-500 mb-2">Escenario #{currentDilemma.id}</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
                {currentDilemma.scenario}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {currentDilemma.solutions.map((solution) => (
                  <motion.div
                    key={solution.generation}
                    onClick={() => handleSelectSolution(solution)}
                    className="p-6 border-2 rounded-lg text-center cursor-pointer hover:border-primary hover:shadow-lg transition-all"
                    whileHover={{ scale: 1.05 }}
                  >
                    <h3 className="text-xl font-bold text-primary">{solution.generation}</h3>
                    <p className="mt-2 text-gray-600">{solution.method}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Dilemma;