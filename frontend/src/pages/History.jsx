import { useState, useEffect } from "react";
import Articles from "./Articles";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      try {
        setHistory([
          {
            id: 1,
            title: "Introduction à React",
            url: "/react-intro",
            date: "2025-03-21",
            description:
              "Une introduction complète à React et ses concepts de base.",
          },
          {
            id: 2,
            title: "Utiliser Tailwind CSS",
            url: "/tailwind-guide",
            date: "2025-03-20",
            description:
              "Un guide détaillé pour utiliser Tailwind CSS efficacement.",
          },
          {
            id: 3,
            title: "Routing avec React Router",
            url: "/react-router",
            date: "2025-03-18",
            description:
              "Apprenez à naviguer entre les pages avec React Router.",
          },
          {
            id: 4,
            title: "Gestion d'état avec Redux",
            url: "/redux-guide",
            date: "2025-03-17",
            description:
              "Un guide pour comprendre Redux et gérer l'état global.",
          },
          {
            id: 5,
            title: "Gestion d'état avec Redux",
            url: "/redux-guide",
            date: "2025-03-17",
            description:
              "Un guide pour comprendre Redux et gérer l'état global.",
          },
          {
            id: 6,
            title: "Gestion d'état avec Redux",
            url: "/redux-guide",
            date: "2025-03-17",
            description:
              "Un guide pour comprendre Redux et gérer l'état global.",
          },
        ]);
        setLoading(false);
      } catch (err) {
        setError("Impossible de charger l'historique.");
        setLoading(false);
      }
    }, 2000);
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
          : history.map((item) => (
             <Articles article={item} />
            ))}
      </div>
    </div>
  );
}
