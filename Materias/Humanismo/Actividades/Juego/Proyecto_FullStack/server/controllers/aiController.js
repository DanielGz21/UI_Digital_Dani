// server/controllers/aiController.js
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Inicializamos el cliente de la API con nuestra clave
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.chatWithGuide = async (req, res) => {
  const { message, persona } = req.body;

  if (!message) {
    return res.status(400).json({ msg: 'El mensaje es requerido' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // 1. Creamos un "prompt" muy específico para la IA.
    //    Le damos un rol, una personalidad y reglas claras.
    const prompt = `
      Eres un guía virtual en un museo sobre generaciones. Tu nombre es Alex y eres un Millennial.
      Debes responder a las preguntas del usuario desde la perspectiva de un Millennial amigable, un poco nostálgico y conocedor de la tecnología de los años 90 y 2000.
      
      Reglas importantes:
      - Habla en primera persona (ej: "Recuerdo que nosotros...", "En mi época...").
      - Mantén tus respuestas concisas y directas (máximo 2-3 frases).
      - No rompas el personaje. Eres Alex, el Millennial, no una IA.
      - Si te preguntan algo que no sabes o que está fuera de tema, responde amablemente que te especializas en la cultura digital de tu generación.

      Pregunta del usuario: "${message}"
      
      Tu respuesta como Alex:
    `;

    // 2. Enviamos el prompt a la IA
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // 3. Enviamos la respuesta de la IA de vuelta al frontend
    res.json({ reply: text });

  } catch (error) {
    console.error('Error al comunicarse con la API de IA:', error);
    res.status(500).send('Hubo un error al procesar tu pregunta.');
  }
};