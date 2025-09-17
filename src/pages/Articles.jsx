// src/pages/Articles.jsx

import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { articlesData } from "../data/mockData"; // Importamos los datos

// Componente para una tarjeta de artículo (¡lo movimos aquí para más orden!)
function ArticleCard({ id, img, title, author, date }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow">
      <Link to={`/article/${id}`}>
        <img
          src={img}
          alt={`Portada del artículo: ${title}`}
          className="mb-4 rounded-lg w-full h-48 object-cover"
        />
        <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600">Autor: {author}</p>
        <p className="text-gray-600">Fecha: {date}</p>
      </Link>
    </div>
  );
}

export default function Articles({ search }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Simulamos la carga de datos
    setArticles(articlesData);
  }, []);

  // Usamos useMemo para optimizar el filtrado.
  // Esta función solo se volverá a ejecutar si 'search' o 'articles' cambian.
  const filteredArticles = useMemo(() => {
    if (!search) {
      return articles; // Si no hay búsqueda, devuelve todos los artículos
    }
    const lowercasedSearch = search.toLowerCase();
    return articles.filter(
      (article) =>
        article.title.toLowerCase().includes(lowercasedSearch) ||
        article.author.toLowerCase().includes(lowercasedSearch)
    );
  }, [search, articles]);

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <main className="container mx-auto p-4">
        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6">Todos los Artículos</h2>
          
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  id={article.id}
                  img={article.img}
                  title={article.title}
                  author={article.author}
                  date={article.date}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-lg">
              No se encontraron artículos que coincidan con tu búsqueda.
            </p>
          )}
        </section>
      </main>
    </div>
  );
}