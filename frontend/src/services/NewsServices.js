import axios from "axios";
import { CONFIG } from "../config";

export default class NewsServices {
  async getFilterNews(filters = null) {
    try {
      const params = {
        query: filters.keyword,
        from: filters.startDate,
        to: filters.endDate,
        sortBy: filters.sortBy,
      };
      const response = await axios.get(`${CONFIG.BACKEND_API_URL}/api/news`, {
        params,
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Erreur lors de la récupération des articles"
      );
    }
  }
  async getAllNews() {
    try {
      const response = await axios.get(`${CONFIG.BACKEND_API_URL}/api/news`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Erreur lors de la récupération des articles"
      );
    }
  }
}
