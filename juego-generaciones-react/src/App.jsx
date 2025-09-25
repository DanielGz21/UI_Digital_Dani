import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Counter from "./components/Counter";
import Home from "./pages/Home";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Home />
        <Counter />
      </main>
      <Footer />
    </div>
  );
}

export default App;
