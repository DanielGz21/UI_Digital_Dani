// src/components/Quiz.jsx

import React, { useState } from 'react';

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
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  }

  return (
    <section className="bg-white max-w-2xl mx-auto rounded-xl shadow-lg p-6 md:p-8">
      {showScore ? (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            ¡Terminaste!
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Tu puntuación final es {score} de {questions.length}
          </p>
          <button onClick={restartGame} className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
            Jugar de nuevo
          </button>
        </div>
      ) : (
        <>
          <div>
            <div className="mb-4">
              <span className="text-lg text-gray-500">Pregunta {currentQuestion + 1} de {questions.length}</span>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 min-h-[80px]">
              {questions[currentQuestion].text}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions[currentQuestion].options.map((option) => (
              <button 
                key={option.id} 
                onClick={() => handleAnswerOptionClick(option.isCorrect)}
                className="bg-gray-100 border border-gray-300 text-gray-700 p-4 rounded-lg text-left hover:bg-blue-100 hover:border-blue-400 transition-all"
              >
                {option.text}
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default Quiz;