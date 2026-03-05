const express = require('express');
const router = express.Router();
const { Categorie, Specialite } = require('../models');

// GET /api/categories — liste toutes les catégories
router.get('/', async (req, res) => {
    try {
        const categories = await Categorie.findAll({
            order: [['nom', 'ASC']],
        });
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

module.exports = router;
