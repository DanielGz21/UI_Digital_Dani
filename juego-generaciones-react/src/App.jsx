// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Generations from './pages/Generations';
import About from './pages/About';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Timeline from './pages/Timeline';
import Dilemma from './pages/Dilemma';
import Museum from './pages/Museum'; // 1. Importa la nueva página del museo
import Quiz from './components/Quiz';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/juego" element={<Quiz />} />
          <Route path="/generaciones" element={<Generations />} />
          <Route path="/acerca-de" element={<About />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/linea-de-tiempo" element={<Timeline />} />
          <Route path="/dilema" element={<Dilemma />} />
          <Route path="/museo" element={<Museum />} /> {/* 2. Añade la nueva ruta */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;