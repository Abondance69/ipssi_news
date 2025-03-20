const axios = require("../utils/axiosInstance");
const CONFIG = require("../config/config");

exports.getNewsFromNewsAPI = async (req, res) => {
  try {
    const { query, category, from, to } = req.query;

    const url = `https://newsapi.org/v2/everything?q=${query}&from=${from}&to=${to}&category=${category}&apiKey=${NEWS_API_KEY}`;
    const response = await axios.get(url);

    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Impossible de récupérer les actualités de NewsAPI" });
  }
};

exports.getNewsFromNYTimes = async (req, res) => {
  try {
    const { query } = req.query;

    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${NYTIMES_API_KEY}`;
    const response = await axios.get(url);

    res.json(response.data.response.docs);
  } catch (error) {
    res
      .status(500)
      .json({ msg: `Impossible de récupérer les données: ${error}` });
  }
};

// GNEWS
const getNewsFromGNews = async (req, res) => {
  try {
    const { query } = req.query;

    const url = `https://gnews.io/api/v4/search?q=${query}&token=${CONFIG.GNEWS_API_KEY}`;
    const response = await axios.get(url);

    return response;

    // res.json(response.data.articles);
  } catch (error) {
    res
      .status(500)
      .json({ msg: `Impossible de récupérer les données: ${error}` });
  }
};

exports.getAllNews = async (req, res) => {
  const { query } = req.params;

//   const data1 = getNewsFromGNews();
//   const data2 = await getNewsFromNewsAPI();

  //   const allData = [...data1];

  res.json({ msg: "Test données" });
};
