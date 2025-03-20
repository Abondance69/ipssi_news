const axios = require("axios");

const axiosInstance = axios.create({
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour gérer les erreurs globalement
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "Une erreur est survenue :",
      error.response?.data || error.message
    );
    return Promise.reject(
      error.response?.data || { message: "Erreur API externe" }
    );
  }
);

module.exports = axiosInstance;
