const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config(); // si tu utilises .env
const authRoutes = require('./routes/auth'); // <- tu ajoutes cette ligne

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes); // <- tu ajoutes cette ligne aussi

app.get('/', (req, res) => {
  res.send('API en ligne');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur backend démarré sur le port ${PORT}`));
