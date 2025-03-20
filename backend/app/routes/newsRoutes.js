// routes/newsRoutes.js
const express = require('express');
const axiosInstance = require('../utils/axiosInstance');
const router = express.Router();

// Clés API stockées dans .env
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NYT_API_KEY = process.env.NYT_API_KEY;
const GNEWS_API_KEY = process.env.GNEWS_API_KEY;

// Fonction pour normaliser un article
const normalizeArticle = (source, article) => {
    // Retourne un objet uniforme avec des champs cohérents
    return {
        title: article.title || article.headline?.main || article.name,
        description: article.description || article.snippet || article.content,
        url: article.url || article.web_url || article.url,
        publishedAt: article.publishedAt || article.pub_date || article.date,
        source: source,  // Ajoute la source pour savoir d'où vient l'article
    };
};

// Fonction pour appeler NewsAPI
const fetchFromNewsAPI = async (params) => {
    try {
        const response = await axiosInstance.get('https://newsapi.org/v2/everything', {
            params: {
                ...params,
                apiKey: NEWS_API_KEY,
            },
        });
        return response.data.articles.map((article) => normalizeArticle('NewsAPI', article));
    } catch (error) {
        console.error('Erreur NewsAPI:', error.message);
        return [];
    }
};

// Fonction pour appeler NYTimes API
const fetchFromNYTAPI = async (params) => {
    try {
        const response = await axiosInstance.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
            params: {
                ...params,
                'api-key': NYT_API_KEY,
            },
        });
        return response.data.response.docs.map((article) => normalizeArticle('NYTimes', article));
    } catch (error) {
        console.error('Erreur NYTimes:', error.message);
        return [];
    }
};

// Fonction pour appeler GNews API
const fetchFromGNewsAPI = async (params) => {
    try {
        const response = await axiosInstance.get('https://gnews.io/api/v4/search', {
            params: {
                ...params,
                token: GNEWS_API_KEY,
            },
        });
        return response.data.articles.map((article) => normalizeArticle('GNews', article));
    } catch (error) {
        console.error('Erreur GNews:', error.message);
        return [];
    }
};

// Route de recherche combinée
router.get('/search', async (req, res) => {
    const { keyword, category, startDate, endDate, popularity } = req.query;

    try {
        // Préparer les paramètres de recherche pour les différentes APIs
        const params = {
            q: keyword || '',
            category: category || '',
            from: startDate || '',
            to: endDate || '',
            sortBy: popularity || 'relevancy', // Popularité (ou pertinent)
        };

        // Récupérer les articles depuis les trois APIs
        const newsAPIArticles = await fetchFromNewsAPI(params);
        const nytAPIArticles = await fetchFromNYTAPI(params);
        const gnewsAPIArticles = await fetchFromGNewsAPI(params);

        // Combiner tous les articles
        let allArticles = [
            ...newsAPIArticles,
            ...nytAPIArticles,
            ...gnewsAPIArticles,
        ];

        // Appliquer les filtres supplémentaires sur les articles combinés
        if (keyword) {
            allArticles = allArticles.filter(article =>
                article.title.toLowerCase().includes(keyword.toLowerCase()) ||
                article.description.toLowerCase().includes(keyword.toLowerCase())
            );
        }

        // Trier les articles par date (si nécessaire)
        allArticles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

        // Retourner les articles combinés et filtrés
        res.json(allArticles);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
});

module.exports = router;
