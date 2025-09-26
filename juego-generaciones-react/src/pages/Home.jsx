// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Home() {
  return (
    <motion.div 
      className="text-center flex flex-col items-center justify-center h-full"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
          Descubre el Mundo
        </span>
        <br />
        a través de las Generaciones.
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
        ¿Crees que sabes cómo piensa cada generación? ¡Ponte a prueba con nuestra trivia interactiva y aprende sobre las diferencias que nos unen!
      </p>
      <Link to="/juego">
        <motion.button 
          className="bg-primary text-white font-bold text-xl py-4 px-10 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ¡Comenzar a Jugar!
        </motion.button>
      </Link>
    </motion.div>
  );
}

export default Home;