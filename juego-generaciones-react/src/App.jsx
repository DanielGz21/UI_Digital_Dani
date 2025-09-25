import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Quiz from "./components/Quiz"; // Importa el nuevo componente

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Home />
        <Quiz /> {/* Usa el componente Quiz aquí */}
      </main>
      <Footer />
    </div>
  );
}

export default App;