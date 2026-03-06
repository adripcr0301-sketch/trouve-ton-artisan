# Trouve ton artisan

Plateforme web permettant aux particuliers de trouver un artisan en région Auvergne-Rhône-Alpes et de le contacter directement via un formulaire de contact.

**Maquettes Figma** : https://www.figma.com/design/9XxcE4RcEiPT5Nr6tNJzdU/Trouve-ton-artisan?node-id=10-1530&t=CxiIfUJOiFgbv1Mf-1

## Stack technique

- **Frontend** : React 18 + Vite + Bootstrap 5 + Sass
- **Backend** : Node.js + Express + Sequelize
- **Base de données** : MySQL

## Prérequis

- Node.js ≥ 18
- MySQL ≥ 8
- npm ≥ 9

## Installation locale

### 1. Cloner le dépôt

```bash
git clone https://github.com/adripcr0301-sketch/trouve-ton-artisan.git
cd trouve-ton-artisan
```

### 2. Base de données

Créer la base et insérer les données :

```bash
mysql -u root -p < sql/01_schema.sql
mysql -u root -p < sql/02_insert.sql
```

### 3. Backend

```bash
cd server
cp .env.example .env
# Renseigner les variables dans .env
npm install
npm start
```

Variables d'environnement (`server/.env`) :

| Variable | Description |
|----------|-------------|
| `DB_HOST` | Hôte MySQL (ex : `localhost`) |
| `DB_PORT` | Port MySQL (défaut : `3306`) |
| `DB_NAME` | Nom de la base (`trouve_ton_artisan`) |
| `DB_USER` | Utilisateur MySQL |
| `DB_PASSWORD` | Mot de passe MySQL |
| `MAIL_HOST` | Serveur SMTP |
| `MAIL_PORT` | Port SMTP |
| `MAIL_USER` | Email d'envoi |
| `MAIL_PASS` | Mot de passe email |
| `API_KEY` | Clé secrète pour sécuriser l'API |
| `PORT` | Port du serveur (défaut : `3000`) |

L'API sera disponible sur `http://localhost:3000`.

### 4. Frontend

```bash
cd client
cp .env.example .env
# Renseigner les variables dans .env
npm install
npm run dev
```

Variables d'environnement (`client/.env`) :

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | URL de l'API (ex : `http://localhost:3000`) |
| `VITE_API_KEY` | Clé API (même valeur que `API_KEY` côté serveur) |

L'application sera disponible sur `http://localhost:5173`.

## Routes API

Toutes les routes nécessitent le header `X-API-Key`.

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/categories` | Liste toutes les catégories |
| GET | `/api/artisans` | Liste tous les artisans |
| GET | `/api/artisans?top=true` | Artisans mis en avant |
| GET | `/api/artisans/search?q=xxx` | Recherche par nom |
| GET | `/api/artisans/:id` | Détail d'un artisan |
| POST | `/api/contact` | Envoyer un message à un artisan |

## Déploiement

- **Base de données** : [Clever Cloud](https://www.clever-cloud.com) (MySQL)
- **API** : [Render](https://render.com) (Node.js)
- **Frontend** : [Netlify](https://www.netlify.com) (site statique)

## Structure du projet

```
trouve-ton-artisan/
├── client/               # Frontend React
│   ├── public/           # Assets statiques (logo, favicon)
│   ├── src/
│   │   ├── components/   # Header, Footer, ArtisanCard, SearchBar, StarRating
│   │   ├── pages/        # Home, Category, ArtisanDetail, NotFound, Legal
│   │   ├── services/     # api.js — appels à l'API
│   │   └── styles/       # main.scss — styles personnalisés
│   └── package.json
├── server/               # Backend Express
│   ├── config/           # Connexion Sequelize
│   ├── models/           # Artisan, Categorie, Specialite
│   ├── routes/           # artisans.js, categories.js, contact.js
│   ├── middleware/        # security.js — authentification API key
│   └── app.js
└── sql/
    ├── 01_schema.sql     # Création des tables
    └── 02_insert.sql     # Données initiales
```
