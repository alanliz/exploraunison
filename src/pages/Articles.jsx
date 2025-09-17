import React, { useMemo } from "react";
import { Link, useOutletContext } from "react-router-dom";

// Función para quitar acentos y convertir a minúsculas
const normalizeText = (text) => {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

function ArticleCard({ id, img, title, author, date }) {
  return (
    // --- EFECTOS HOVER ESTANDARIZADOS ---
    <div className="bg-white p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer">
      <Link to={`/article/${id}`}>
        <img
          src={img}
          alt={`Portada del artículo: ${title}`}
          className="mb-4 rounded-lg w-full h-48 object-cover"
          loading="lazy"
        />
        <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600">Autor: {author}</p>
        <p className="text-gray-600">Fecha: {date}</p>
      </Link>
    </div>
  );
}

export default function Articles({ search }) {
  const { content, loading } = useOutletContext();
  const articles = content.articles || [];

  const filteredArticles = useMemo(() => {
    const normalizedSearch = normalizeText(search);
    if (!normalizedSearch) return articles;

    return articles.filter(
      (article) =>
        normalizeText(article.title).includes(normalizedSearch) ||
        normalizeText(article.author).includes(normalizedSearch)
    );
  }, [search, articles]);

  if (loading) {
    return <div className="text-center p-8">Cargando artículos...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="container mx-auto p-4 md:p-8">
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