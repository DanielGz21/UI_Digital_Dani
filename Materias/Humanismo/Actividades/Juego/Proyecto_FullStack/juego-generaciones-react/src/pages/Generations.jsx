// src/pages/Generations.jsx
import { motion } from 'framer-motion';

const generationsData = [
  { name: 'Baby Boomers', years: '1946-1964', description: 'Crecieron en la era de la posguerra. Valoran el trabajo duro y son más análogos en su enfoque tecnológico.' },
  { name: 'Generación X', years: '1965-1980', description: 'La generación "puente" entre el mundo análogo y el digital. Se adaptaron a la tecnología a medida que surgía.' },
  { name: 'Millennials', years: '1981-1996', description: 'Los primeros nativos digitales. Crecieron con el auge de internet y las redes sociales.' },
  { name: 'Generación Z', years: '1997-2012', description: 'Nacieron con un smartphone en la mano. La tecnología es una extensión natural de sus vidas.' },
];

const GenerationCard = ({ data, index }) => (
  <motion.div 
    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <h3 className="text-2xl font-bold text-primary">{data.name}</h3>
    <p className="font-semibold text-gray-500 mb-2">{data.years}</p>
    <p className="text-gray-700">{data.description}</p>
  </motion.div>
);

function Generations() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h2 className="text-4xl font-bold text-center mb-8">Explora las Generaciones</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {generationsData.map((gen, index) => (
          <GenerationCard key={gen.name} data={gen} index={index} />
        ))}
      </div>
    </motion.div>
  );
}

export default Generations;