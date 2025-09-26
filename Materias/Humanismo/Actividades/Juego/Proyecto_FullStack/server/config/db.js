// server/config/db.js
const { Pool } = require('pg');
require('dotenv').config();

// Creamos un "pool" de conexiones. Esto es mucho más eficiente
// que crear una conexión por cada consulta a la base de datos.
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Exportamos una función para poder hacer consultas desde cualquier parte
// de nuestra aplicación.
module.exports = {
  query: (text, params) => pool.query(text, params),
};