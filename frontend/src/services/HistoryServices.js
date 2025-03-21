import axios from "axios";
import { CONFIG } from "../config";

export default class HistoryServices {
  async getHistories() {
    try {
      const response = await axios.get(
        `${CONFIG.BACKEND_API_URL}/api/histories`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      throw new Error("Une erreur est survenue", error);
    }
  }

  async createHistory(formData) {
    try {
      const response = await axios.post(
        `${CONFIG.BACKEND_API_URL}/api/history`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.msg || "Erreur de connexion");
      } else if (error.request) {
        throw new Error("Aucune réponse du serveur. Vérifiez votre connexion.");
      } else {
        throw new Error("Une erreur inconnue est survenue.");
      }
    }
  }
}
