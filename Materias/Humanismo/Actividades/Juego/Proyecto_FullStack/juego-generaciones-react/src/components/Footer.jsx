// src/components/Footer.jsx

function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-16 py-6">
      <div className="container mx-auto text-center">
        <p>© {new Date().getFullYear()} Hecho por Albert Daniel Gaviria Zapata</p>
      </div>
    </footer>
  );
}

export default Footer;