import { useState, useEffect } from "react";
import Articles from "../components/Articles";
import HistoryServices from "../services/HistoryServices";

export default function History() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const historyServices = new HistoryServices();
        const result = await historyServices.getHistories();
        setLoading(false);
        setData(result.articles);
        // console.log(data);
      } catch (error) {
        setError(error.message || "Erreur lors du chargement des actualités.");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 my-12 bg-slate-100">
      <h1 className="text-2xl font-bold mb-8 text-center">
        Historique de navigation
      </h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading
          ? [...Array(6)].map((_, index) => (
              <div
                key={index}
                className="flex bg-gray-200 animate-pulse border border-gray-300 shadow-md rounded-lg overflow-hidden"
              >
                <div className="w-1/3 bg-gray-300 h-40"></div>

                <div className="w-2/3 p-4">
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-6"></div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-6"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              </div>
            ))
          : data.map((item) => <Articles key={item._id} article={item} />)}
      </div>
    </div>
  );
}
