import React from "react";
import livre from "../assets/images/livre.jpg";
import HistoryServices from "../services/HistoryServices";

export default function Articles({ article }) {
  const handleImageError = (e) => {
    e.target.src = livre; // image en cas d'erreur
  };

  const handleClick = async () => {
    try {
      const historyServices = new HistoryServices();

      const formData = {
        title: article.title,
        description: article.description,
        url: article.url ?? "",
        image: article.image,
      };

      const create = await historyServices.createHistory(formData);
    } catch (error) {
      setError(error.message || "Erreur lors du chargement des actualités.");
    }
  };

  return (
    <div
      key={article.id}
      className="flex bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden"
    >
      {/* IMAGE */}
      <div className="w-1/3">
        <img
          src={article.image}
          onError={handleImageError}
          alt="article"
          className="w-full h-full object-cover"
        />
      </div>

      {/* TEXTE */}
      <div className="w-2/3 p-4 flex flex-col justify-between">
        <div>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl font-semibold text-blue-600 hover:underline"
            onClick={handleClick}
          >
            {article.title}
          </a>

          <p className="text-gray-700 mt-2">
            {article.description?.length > 80
              ? `${article.description.substring(0, 80)}...`
              : article.description}
          </p>
        </div>

        <p className="text-gray-500 text-sm mt-2">
          Visité le : {article.publishedAt ?? article.consultedAt}
        </p>
      </div>
    </div>
  );
}
