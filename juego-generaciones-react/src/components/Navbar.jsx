// src/components/Navbar.jsx

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">Juego de Generaciones 🎮</h1>
        <ul className="flex space-x-6">
          <li><a href="#" className="hover:text-blue-200">Inicio</a></li>
          <li><a href="#" className="hover:text-blue-200">Acerca</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;