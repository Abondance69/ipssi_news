const axios = require("../utils/axiosInstance");
const CONFIG = require("../config/config");

exports.getNewsFromNewsAPI = async (query, from, to) => {
  try {
    let url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${CONFIG.NEWS_API_KEY}`;

    if (from) url += `&from=${from}`;
    if (to) url += `&to=${to}`;

    const response = await axios.get(url);
    return response.data.articles.map((article) => ({
      title: article.title,
      description: article.description,
      content: article.content || "",
      url: article.url,
      image: article.urlToImage || "",
      publishedAt: article.publishedAt,
      source: {
        name: article.source.name,
        url: "",
      },
    }));
  } catch (error) {
    console.error("Erreur NewsAPI:", error.message);
    return [];
  }
};

exports.getNewsFromGNews = async (query, category, from, to) => {
  try {
    let url = `${CONFIG.GNEW_API_URL}/search?q=${query}&token=${CONFIG.GNEWS_API_KEY}`;

    if (category) url += `&category=${category}`;
    if (from) url += `&from=${from}`;
    if (to) url += `&to=${to}`;

    const response = await axios.get(url);
    return response.data.articles.map((article) => ({
      title: article.title,
      description: article.description,
      content: article.content || "",
      url: article.url,
      image: article.image || "",
      publishedAt: article.publishedAt,
      source: {
        name: article.source.name,
        url: article.source.url,
      },
    }));
  } catch (error) {
    console.error("Erreur GNews:", error.message);
    return [];
  }
};

exports.getNewsFromNYT = async (query, from, to) => {
  try {
    let url = `${CONFIG.NYTIMES_API_URL}/world.json?api-key=${CONFIG.NYTIMES_API_KEY}`;

    if (from) url += `&begin_date=${from}`;
    if (to) url += `&end_date=${to}`;

    const response = await axios.get(url);

    return response.data.results.map((article) => ({
      title: article.title,
      description: article.abstract || "",
      content: article.lead_paragraph || "",
      url: article.web_url,
      image:
        article.multimedia && article.multimedia.length > 0
          ? `${article.multimedia[0].url}`
          : "",
      publishedAt: article.pub_date,
      source: {
        name: "The New York Times",
        url: "https://www.nytimes.com",
      },
    }));
  } catch (error) {
    console.error("Erreur NYT:", error.message);
    return [];
  }
};

exports.getAllNews = async (req, res) => {
  try {
    const { query, category, from, to, source, contentFilter, sortBy } =
      req.query;

    const [newsAPI, gNews, getNYT] = await Promise.all([
      exports.getNewsFromNewsAPI(query, from, to),
      exports.getNewsFromGNews(query, category, from, to),
      exports.getNewsFromNYT(query, from, to),
    ]);

    let allNews = [...newsAPI, ...gNews, ...getNYT];

    // Filtrer par source
    if (source) {
      allNews = allNews.filter((article) =>
        article.source.name.toLowerCase().includes(source.toLowerCase())
      );
    }

    // Filtrer par contenu
    if (contentFilter) {
      allNews = allNews.filter(
        (article) =>
          (article.content &&
            article.content
              .toLowerCase()
              .includes(contentFilter.toLowerCase())) ||
          (article.description &&
            article.description
              .toLowerCase()
              .includes(contentFilter.toLowerCase()))
      );
    }

    // Trier
    if (sortBy === "date") {
      allNews.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    } else if (sortBy === "title") {
      allNews.sort((a, b) => a.title.localeCompare(b.title));
    }

    res.json({ total: allNews.length, articles: allNews });
  } catch (error) {
    res.status(500).json({
      msg: `Erreur lors de la récupération des actualités: ${error.message}`,
    });
  }
};
