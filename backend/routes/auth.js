const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Connexion (login)
router.post('/login', async (req, res) => {
  const { email, mot_de_passe } = req.body;

  try {
    // 1. Vérifie si l'utilisateur existe
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ message: 'Utilisateur non trouvé' });
    }

    // 2. Vérifie le mot de passe
    const isMatch = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }

    // 3. Génère le token JWT
    const token = jwt.sign(
      { id: user.id, role_id: user.role_id },
      'votre_secret_jwt', // À remplacer par process.env.JWT_SECRET dans un vrai projet
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role_id: user.role_id
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
