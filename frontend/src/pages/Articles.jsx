import React from 'react';
import { Link } from "react-router-dom";
import livre from "../assets/images/livre.jpg";

export default function Articles({ article }) {
  const handleImageError = (e) => {
    e.target.src = livre;
  };

  return (
    <div
      key={article.id}
      className="flex bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden"
    >
      {/* IMAGE */}
      <div className="w-1/3">
        <img src={article.image} onError={handleImageError}  alt="article" className="w-full h-full object-cover" />
      </div>

      {/* TEXTE */}
      <div className="w-2/3 p-4 flex flex-col justify-between">
        <div>
          <Link
            to={article.url}
            className="text-xl font-semibold text-blue-600 hover:underline"
          >
            {article.title}
          </Link>
          <p className="text-gray-700 mt-2">
            {article.description?.length > 80
              ? `${article.description.substring(0, 80)}...`
              : article.description}
          </p>
        </div>

        <p className="text-gray-500 text-sm mt-2">Visité le : {article.publishedAt}</p>
      </div>
    </div>
  );
}
