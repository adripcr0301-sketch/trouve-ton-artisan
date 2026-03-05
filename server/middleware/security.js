// Middleware de vérification de la clé API
// L'accès à l'API est limité à l'application via une clé dans le header X-API-Key
const apiKeyAuth = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(401).json({ message: 'Accès non autorisé' });
    }
    next();
};

module.exports = { apiKeyAuth };
