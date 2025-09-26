// server/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
  // 1. Obtener el token de la cabecera 'Authorization'
  const authHeader = req.header('Authorization');
  
  // Verificar si no hay token o el formato es incorrecto
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No hay token, autorización denegada' });
  }
  
  try {
    const token = authHeader.split(' ')[1];
    
    // 2. Verificar el token usando nuestro secreto
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Si el token es válido, añadimos el payload del usuario (incluyendo su ID)
    //    al objeto 'req' para que las rutas protegidas puedan usarlo.
    req.user = decoded.user;
    next(); // Permite que la petición continúe hacia el controlador
  } catch (err) {
    res.status(401).json({ msg: 'El token no es válido' });
  }
};