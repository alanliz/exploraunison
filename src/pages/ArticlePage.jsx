// src/pages/ArticlePage.jsx

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { articlesData } from '../data/mockData';

export default function ArticlePage() {

  const { id } = useParams(); 
  const article = articlesData.find(a => a.id === Number(id));
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

  // Si encontramos el artículo, lo mostramos.
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
              <p><strong>Volumen:</strong> {article.volume}</p>
              <p><strong>Número:</strong> {article.number}</p>
              <p><strong>Fecha:</strong> {article.date}</p>
              <p><strong>Autor:</strong> {article.author}</p>
              {/* Puedes añadir más campos si los tienes */}
              <p className="pt-4">
                <strong>Abstract:</strong> Este artículo explora las últimas innovaciones en la ingeniería industrial...
              </p>
            </div>
            <button className="mt-6 bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700">
              Descargar PDF
            </button>
          </div>
        </div>
        
        {/* Opcional: Navegación al siguiente/anterior artículo */}
        <div className="mt-8 pt-6 border-t flex justify-between">
          {Number(id) > 1 && 
            <Link to={`/article/${Number(id) - 1}`} className="text-gray-600 hover:text-black">
              &larr; Artículo Anterior
            </Link>
          }
          {Number(id) < articlesData.length && 
            <Link to={`/article/${Number(id) + 1}`} className="text-gray-600 hover:text-black">
              Artículo Siguiente &rarr;
            </Link>
          }
        </div>
      </div>
    </div>
  );
}