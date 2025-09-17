import React from 'react';
import { useParams, Link, useOutletContext } from 'react-router-dom';

export default function ArticlePage() {
  const { id } = useParams();
  const { content, loading } = useOutletContext();
  
  if (loading) {
    return <div className="text-center p-8">Cargando artículo...</div>;
  }

  const articles = content.articles || [];
  const article = articles.find(a => a.id === Number(id));

  if (!article) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-2xl font-bold">Artículo no encontrado</h2>
        <Link to="/articles" className="text-blue-500 hover:underline mt-4 inline-block">
          Volver a todos los artículos
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
        <Link to="/articles" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-6 inline-block">
          &larr; Todos los artículos
        </Link>
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <img 
              src={article.img} 
              alt={`Portada de ${article.title}`}
              className="rounded-lg shadow-md w-full"
            />
          </div>
          <div className="md:w-2/3">
            <div className="text-lg space-y-2">
              <p><strong>Autor:</strong> {article.author}</p>
              <p><strong>Fecha:</strong> {article.date}</p>
              <p><strong>Volumen:</strong> {article.volume}</p>
              <p><strong>Número:</strong> {article.number}</p>
              <p><strong>Páginas:</strong> {article.pages}</p>
            </div>
            {article.pdfUrl && (
              <a 
                href={article.pdfUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                download={`${article.title.replace(/\s/g, '_')}.pdf`}
                className="mt-6 bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 inline-block"
              >
                Descargar PDF
              </a>
            )}
          </div>
        </div>
        
        {/* --- SECCIÓN CORREGIDA --- */}
        <div className="mt-8 pt-6 border-t flex justify-between">
          {/* Botón "Anterior" (visible si no es el primer artículo) */}
          {Number(id) > 1 ? (
            <Link to={`/article/${Number(id) - 1}`} className="text-gray-600 hover:text-black font-semibold">
              &larr; Artículo Anterior
            </Link>
          ) : (
            <div></div> // Un div vacío para mantener el espaciado
          )}
          
          {/* Botón "Siguiente" (visible si no es el último artículo) */}
          {Number(id) < articles.length && (
            <Link to={`/article/${Number(id) + 1}`} className="text-gray-600 hover:text-black font-semibold">
              Artículo Siguiente &rarr;
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}