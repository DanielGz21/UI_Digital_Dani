// src/components/AiChat.jsx
import React, { useState, useContext, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

function AiChat({ closeChat }) {
  const { token } = useContext(AuthContext);
  const [messages, setMessages] = useState([
    { from: 'ai', text: '¡Hola! Soy Alex. ¿Qué te gustaría saber sobre la vida de un Millennial en la era digital?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage = { from: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const apiClient = axios.create({
        baseURL: 'http://localhost:5001/api',
        headers: { Authorization: `Bearer ${token}` }
      });
      const response = await apiClient.post('/ai/chat', { message: currentInput });
      
      const aiMessage = { from: 'ai', text: response.data.reply };
      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error("Error al chatear con la IA:", error);
      const errorMessage = { from: 'ai', text: 'Lo siento, estoy teniendo problemas para conectarme en este momento. Intenta más tarde.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-4 right-4 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 font-sans"
    >
      <div className="p-4 bg-primary text-white rounded-t-2xl flex justify-between items-center">
        <h3 className="font-bold text-lg">Habla con Alex, el Guía Millennial</h3>
        <button onClick={closeChat} className="text-2xl font-bold leading-none">&times;</button>
      </div>

      <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'} mb-3`}>
            <div className={`py-2 px-4 rounded-2xl max-w-xs break-words ${msg.from === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && <div className="text-center text-gray-500 italic">Alex está pensando...</div>}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Escribe tu pregunta..."
          className="flex-grow border rounded-l-full px-4 focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={isLoading}
        />
        <button onClick={handleSend} className="bg-primary text-white font-bold px-6 rounded-r-full hover:bg-blue-700 disabled:bg-gray-400 transition-colors" disabled={isLoading}>
          Enviar
        </button>
      </div>
    </motion.div>
  );
}

export default AiChat;