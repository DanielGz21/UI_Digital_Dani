// src/components/Quiz.jsx

import React, { useState, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { saveScore } from '../services/api';

const questions = [
  {
    text: '¿Qué red social era popular principalmente entre los Millennials antes de la llegada de Instagram?',
    options: [
      { id: 0, text: 'TikTok', isCorrect: false },
      { id: 1, text: 'Facebook', isCorrect: true },
      { id: 2, text: 'MySpace', isCorrect: false },
      { id: 3, text: 'LinkedIn', isCorrect: false },
    ],
  },
  {
    text: '¿Qué dispositivo tecnológico es icónico de la Generación X durante su adolescencia?',
    options: [
      { id: 0, text: 'iPhone', isCorrect: false },
      { id: 1, text: 'Walkman o Discman', isCorrect: true },
      { id: 2, text: 'Tablet', isCorrect: false },
      { id: 3, text: 'Smartwatch', isCorrect: false },
    ],
  },
  {
    text: '¿Cuál de estas frases es más probable que use un miembro de la Generación Z?',
    options: [
      { id: 0, text: '¡Qué chido!', isCorrect: false },
      { id: 1, text: '¡Esto es de locos!', isCorrect: false },
      { id: 2, text: 'Es un temazo, literal', isCorrect: true },
      { id: 3, text: '¡Caracoles!', isCorrect: false },
    ],
  },
];

function Quiz() {
  const { isAuthenticated, token } = useContext(AuthContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  // Este efecto se ejecuta cuando el juego termina
  useEffect(() => {
    if (showScore && isAuthenticated && token) {
      console.log('Juego terminado. Guardando puntuación...');
      saveScore(score, token)
        .then(response => {
          console.log('Puntuación guardada exitosamente:', response.data);
        })
        .catch(err => {
          console.error("Error al guardar la puntuación:", err);
        });
    }
  }, [showScore, isAuthenticated, score, token]);

  const handleAnswerOptionClick = (isCorrect, index) => {
    if (selectedOption !== null) return;

    setSelectedOption({ index, isCorrect });
    if (isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedOption(null);
      } else {
        setShowScore(true);
      }
    }, 1200);
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
  };

  const getButtonClass = (option, index) => {
    if (selectedOption === null) {
      return "bg-white hover:bg-gray-100 border-gray-300";
    }
    if (index === selectedOption.index) {
      return selectedOption.isCorrect ? "bg-green-500 text-white border-green-500" : "bg-red-500 text-white border-red-500";
    }
    if (option.isCorrect) {
      return "bg-green-500 text-white border-green-500";
    }
    return "bg-white opacity-60 border-gray-300";
  };

  return (
    <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8">
      <AnimatePresence mode="wait">
        {showScore ? (
          <motion.div
            key="score"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              ¡Juego Terminado!
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Tu puntuación final es <span className="font-bold text-primary">{score}</span> de <span className="font-bold text-primary">{questions.length}</span>
            </p>
            {isAuthenticated && (
              <p className="text-md text-green-600 mb-6">Tu puntuación ha sido guardada.</p>
            )}
            <motion.button
              onClick={restartGame}
              className="bg-primary text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Jugar de nuevo
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6">
              <p className="text-xl font-semibold text-gray-500">
                Pregunta {currentQuestion + 1} de {questions.length}
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-2 min-h-[100px]">
                {questions[currentQuestion].text}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswerOptionClick(option.isCorrect, index)}
                  disabled={selectedOption !== null}
                  className={`p-4 rounded-lg text-left transition-all duration-300 border-2 font-semibold text-lg ${getButtonClass(option, index)} ${selectedOption === null ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Quiz;