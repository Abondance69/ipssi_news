import React, { useState, useEffect } from "react";
import NewsServices from "../services/NewsServices";
import Articles from "../components/Articles";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    keyword: "",
    startDate: "",
    endDate: "",
    sortBy: "popularity",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsServices = new NewsServices();
        const result = await newsServices.getAllNews();
        setData(result.articles);
      } catch (error) {
        setError(error.message || "Erreur lors du chargement des actualités.");
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const applyFilters = async () => {
    setLoading(true);
    setError(null);
    try {
      const newsServices = new NewsServices();
      const result = await newsServices.getFilterNews(filters);
      setData(result.articles);
    } catch (err) {
      setError(err.message || "Erreur lors du chargement des actualités.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 my-12 bg-slate-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-3">📰 News Central</h1>
        <p className="text-lg">
          Votre agrégateur d'actualités personnalisé avec filtres et suivi de
          l'historique
        </p>
      </div>

      <div className="my-6">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="keyword" className="font-semibold">
                Mot-clé
              </label>
              <input
                id="keyword"
                name="keyword"
                type="text"
                value={filters.keyword}
                onChange={handleFilterChange}
                className="p-2 border border-gray-300 rounded"
                placeholder="Rechercher un mot-clé"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="sortBy" className="font-semibold">
                Trier par
              </label>
              <select
                id="sortBy"
                name="sortBy"
                value={filters.sortBy}
                onChange={handleFilterChange}
                className="p-2 border border-gray-300 rounded"
              >
                <option value="popularity">Popularité</option>
                <option value="date">Date de publication</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="startDate" className="font-semibold">
                Date de début
              </label>
              <input
                id="startDate"
                name="startDate"
                type="date"
                value={filters.startDate}
                onChange={handleFilterChange}
                className="p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="endDate" className="font-semibold">
                Date de fin
              </label>
              <input
                id="endDate"
                name="endDate"
                type="date"
                value={filters.endDate}
                onChange={handleFilterChange}
                className="p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={applyFilters} // Applique les filtres au clic
                className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-500"
              >
                Appliquer les filtres
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Message de chargement */}
      {loading && (
        <p className="text-gray-600 text-center animate-pulse">Chargement...</p>
      )}
      {/* Message d'erreur */}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {/* Aucun résultat */}
      {!loading && !error && data.length === 0 && (
        <p className="text-gray-500 text-center">Aucune actualité trouvée.</p>
      )}

      {/* Affichage des articles */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((news, index) => (
          <Articles key={index} article={news} />
        ))}
      </div>
    </div>
  );
}
