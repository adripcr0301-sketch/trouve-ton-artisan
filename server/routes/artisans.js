const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Artisan, Specialite, Categorie } = require('../models');

const include = [
    {
        model: Specialite,
        as: 'specialite',
        include: [{ model: Categorie, as: 'categorie' }],
    },
];

// GET /api/artisans — liste tous les artisans (ou filtre ?top=true ou ?categorie=id)
router.get('/', async (req, res) => {
    try {
        const where = {};
        if (req.query.top === 'true') where.top = 1;

        const artisans = await Artisan.findAll({
            where,
            include,
            order: [['nom', 'ASC']],
        });
        res.json(artisans);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// GET /api/artisans/search?q=xxx — recherche par nom
router.get('/search', async (req, res) => {
    try {
        const { q } = req.query;
        if (!q || q.trim() === '') {
            return res.status(400).json({ message: 'Paramètre de recherche manquant' });
        }
        const artisans = await Artisan.findAll({
            where: { nom: { [Op.like]: `%${q}%` } },
            include,
            order: [['nom', 'ASC']],
        });
        res.json(artisans);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// GET /api/artisans/:id — détail d'un artisan
router.get('/:id', async (req, res) => {
    try {
        const artisan = await Artisan.findByPk(req.params.id, { include });
        if (!artisan) return res.status(404).json({ message: 'Artisan non trouvé' });
        res.json(artisan);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

module.exports = router;
