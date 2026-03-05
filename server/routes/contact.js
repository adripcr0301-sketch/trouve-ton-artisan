const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');
const { Artisan } = require('../models');

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

// POST /api/contact
router.post(
    '/',
    [
        body('artisan_id').isInt({ min: 1 }).withMessage('ID artisan invalide'),
        body('nom').trim().notEmpty().withMessage('Le nom est requis'),
        body('email').isEmail().withMessage('Email invalide'),
        body('objet').trim().notEmpty().withMessage("L'objet est requis"),
        body('message').trim().notEmpty().withMessage('Le message est requis'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { artisan_id, nom, email, objet, message } = req.body;

        try {
            const artisan = await Artisan.findByPk(artisan_id);
            if (!artisan) return res.status(404).json({ message: 'Artisan non trouvé' });

            await transporter.sendMail({
                from: `"Trouve ton artisan" <${process.env.MAIL_USER}>`,
                to: artisan.email,
                replyTo: email,
                subject: `[Contact] ${objet}`,
                text: `Message de ${nom} (${email}) :\n\n${message}`,
                html: `<p><strong>De :</strong> ${nom} (${email})</p><p>${message.replace(/\n/g, '<br>')}</p>`,
            });

            res.json({ message: 'Message envoyé avec succès' });
        } catch (err) {
            res.status(500).json({ message: "Erreur lors de l'envoi du message" });
        }
    }
);

module.exports = router;
