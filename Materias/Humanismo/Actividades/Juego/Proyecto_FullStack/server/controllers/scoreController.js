// server/controllers/scoreController.js
const db = require('../config/db');

// Obtener el perfil del usuario logueado junto con su historial de puntuaciones
exports.getProfile = async (req, res) => {
  try {
    // Obtenemos los datos básicos del usuario desde la tabla 'users'
    const userQuery = 'SELECT user_id, username, email, created_at FROM users WHERE user_id = $1';
    const userResult = await db.query(userQuery, [req.user.id]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    // Obtenemos TODAS las puntuaciones de ese usuario, ordenadas de más reciente a más antigua
    const scoresQuery = 'SELECT score, played_at FROM scores WHERE user_id = $1 ORDER BY played_at DESC';
    const scoresResult = await db.query(scoresQuery, [req.user.id]);

    // Combinamos toda la información en un solo objeto para enviarlo al frontend
    const profileData = {
      user: userResult.rows[0],
      scores: scoresResult.rows,
    };

    res.json(profileData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
};

// La función para guardar una nueva puntuación no necesita cambios
exports.saveScore = async (req, res) => {
  const { score } = req.body;
  const userId = req.user.id; // El ID del usuario viene del token

  if (score === undefined) {
    return res.status(400).json({ msg: 'La puntuación es requerida' });
  }

  try {
    const newScore = await db.query(
      'INSERT INTO scores (user_id, score) VALUES ($1, $2) RETURNING *',
      [userId, score]
    );
    res.status(201).json(newScore.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
};