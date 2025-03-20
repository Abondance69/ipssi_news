la structure le frontend (boussad)
frontend/
├── public/             # Fichiers statiques accessibles publiquement
│
├── src/                # Code source principal
│   ├── assets/         # Images, SVG et autres ressources statiques
│   │   └── react.svg   # Logo React (exemple)
│   │
│   ├── components/     # Composants réutilisables
│   │   ├── Footer.jsx             # Pied de page
│   │   ├── Footer.css             # Styles du pied de page
│   │   ├── Navbar.jsx             # Barre de navigation
│   │   ├── Navbar.css             # Styles de la barre de navigation
│   │   ├── NewsCard.jsx           # Carte d'article individuelle
│   │   ├── NewsCard.css           # Styles de carte d'article
│   │   ├── NewsFilters.jsx        # Filtres de recherche d'actualités
│   │   ├── NewsFilters.css        # Styles des filtres
│   │   ├── NewsList.jsx           # Liste des articles d'actualités
│   │   ├── NewsList.css           # Styles de la liste d'articles
│   │   └── ProtectedRoute.jsx     # Composant pour routes protégées
│   │
│   ├── pages/          # Pages principales de l'application
│   │   ├── Home.jsx               # Page d'accueil avec les actualités
│   │   ├── Home.css               # Styles de la page d'accueil
│   │   ├── Login.jsx              # Page de connexion
│   │   ├── Register.jsx           # Page d'inscription
│   │   ├── Auth.css               # Styles partagés pour l'authentification
│   │   ├── Profile.jsx            # Page de profil avec historique
│   │   ├── Profile.css            # Styles de la page de profil
│   │   ├── NotFound.jsx           # Page 404
│   │   └── NotFound.css           # Styles de la page 404
│   │
│   ├── services/       # Services et utilitaires
│   │   └── api.js                 # Service pour les appels API avec Axios
│   │
│   ├── App.jsx         # Composant principal de l'application
│   ├── App.css         # Styles globaux de l'application
│   ├── main.jsx        # Point d'entrée de l'application
│   └── index.css       # Styles de base et réinitialisation CSS
│
├── .env.example        # Exemple de variables d'environnement
├── package.json        # Dépendances et scripts npm
├── vite.config.js      # Configuration de Vite
└── README.md           # Documentation du projet

# 📰 News Central - Frontend

This is the frontend part of the News Central application, a news aggregator with filtering capabilities and user history tracking.

## Features

- Browse news articles from multiple sources
- Filter news by keyword, category, date, and more
- Save article history for logged-in users
- Recreate previous searches from history

## Technologies Used

- React
- Vite
- React Router
- Axios for API calls
- CSS for styling

## Project Structure

```
src/
├── assets/           # Static assets like images and icons
├── components/       # Reusable UI components
├── pages/            # Main application pages
├── services/         # API services and helpers
├── App.jsx           # Main application component
├── App.css           # Global styles
├── main.jsx          # Application entry point
└── index.css         # Base styles
```

## Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and add your API keys:
   ```bash
   cp .env.example .env
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Backend API

This frontend application expects to connect to a backend API that provides:

- User authentication (login/register)
- News fetching from multiple sources
- History tracking for logged-in users

## Environment Variables

Create a `.env` file with the following variables:

```
VITE_API_URL=http://localhost:5000/api
```

## Notes for Development

- Each team member should create their own `.env` file with personal API keys
- API keys in the frontend are for development only, production should use backend proxying