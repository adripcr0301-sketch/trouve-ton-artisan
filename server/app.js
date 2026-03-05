require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const sequelize = require('./config/database');
const { apiKeyAuth } = require('./middleware/security');

const categoriesRouter = require('./routes/categories');
const artisansRouter = require('./routes/artisans');
const contactRouter = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 3001;

// Sécurité HTTP
app.use(helmet());

// CORS — autorise uniquement le frontend
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
}));

// Limite de requêtes — 100 req / 15 min par IP
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { message: 'Trop de requêtes, réessayez plus tard.' },
});
app.use(limiter);

// Parsing JSON
app.use(express.json());

// Authentification par clé API sur toutes les routes /api
app.use('/api', apiKeyAuth);

// Routes
app.use('/api/categories', categoriesRouter);
app.use('/api/artisans', artisansRouter);
app.use('/api/contact', contactRouter);

// Route inconnue
app.use((req, res) => {
    res.status(404).json({ message: 'Route non trouvée' });
});

// Démarrage
sequelize.authenticate()
    .then(() => {
        console.log('Connexion BDD OK');
        app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
    })
    .catch((err) => {
        console.error('Erreur connexion BDD :', err.message);
    });

module.exports = app;
