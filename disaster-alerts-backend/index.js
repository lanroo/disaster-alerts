const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());

// Simulação de dados de alerta
const alerts = [
  {
    id: 1,
    title: 'Enchente em São Paulo',
    description: 'Risco alto de enchente na região central de São Paulo.',
    latitude: -23.55052,
    longitude: -46.633308,
    type: 'flood',
    risk: 'red'
  },
  {
    id: 2,
    title: 'Terremoto no Chile',
    description: 'Terremoto de magnitude 7.0 próximo a Santiago.',
    latitude: -33.4489,
    longitude: -70.6693,
    type: 'earthquake',
    risk: 'orange'
  }
];

// Rota para obter os dados dos alertas
app.get('/api/alerts', (req, res) => {
  res.json({ alerts });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
