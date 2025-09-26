// server/controllers/authController.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Función para registrar un nuevo usuario
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  // Validación simple
  if (!username || !email || !password) {
    return res.status(400).json({ msg: 'Por favor, introduce todos los campos' });
  }

  try {
    // 1. Verificar si el usuario ya existe
    const userExists = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ msg: 'El correo electrónico ya está en uso' });
    }

    // 2. Hashear la contraseña (¡NUNCA guardarla en texto plano!)
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // 3. Guardar el nuevo usuario en la base de datos
    const newUser = await db.query(
      'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING user_id, username, email',
      [username, email, password_hash]
    );

    res.status(201).json({
      msg: 'Usuario registrado con éxito',
      user: newUser.rows[0],
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
};

// Función para iniciar sesión
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Verificar si el usuario existe
    const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    // 2. Comparar la contraseña enviada con la hasheada en la BD
    const isMatch = await bcrypt.compare(password, user.rows[0].password_hash);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    // 3. Si todo es correcto, crear y firmar un JSON Web Token
    const payload = {
      user: {
        id: user.rows[0].user_id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5h' }, // El token expirará en 5 horas
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
};