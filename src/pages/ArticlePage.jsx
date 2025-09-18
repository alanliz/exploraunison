import React from 'react';
import { useParams, Link, useOutletContext, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid'; // ¡NUEVO! Importamos el ícono

export default function ArticlePage() {
  const { id } = useParams();
  const { content, loading } = useOutletContext();
  const navigate = useNavigate();

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
    <div className="bg-white min-h-screen">
      <main className="container mx-auto p-4 md:p-8 max-w-4xl">
        <div className="bg-white p-8 rounded-lg">
          
          {/* --- BOTÓN REDISEÑADO --- */}
          <Link 
            to="/articles" 
            className="inline-flex items-center gap-2 text-blue-600 font-semibold border-2 border-blue-600 rounded-full px-4 py-2 transition-all duration-300 hover:bg-blue-600 hover:text-white mb-6"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Todos los artículos
          </Link>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">{article.title}</h1>
          
          <p className="text-lg italic text-gray-600 mb-6 border-l-4 border-blue-200 pl-4">
            {article.abstract}
          </p>
          
          <div className="w-full">
            <div className="text-lg space-y-2">
              <p><strong>Autor:</strong> {article.author}</p>
              <p><strong>Fecha:</strong> {article.date}</p>
              <p><strong>Volumen:</strong> {article.volume}</p>
              <p><strong>Número:</strong> {article.number}</p>
              <p><strong>Páginas:</strong> {article.pages}</p>
            </div>
            
            <div className="mt-6 flex items-center gap-4">
              {article.pdfUrl ? (
                <>
                  <a 
                    href={article.pdfUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 inline-block shadow-lg"
                  >
                    Abrir en nueva pestaña
                  </a>
                  <a 
                    href={article.pdfUrl} 
                    download={`${article.title.replace(/\s/g, '_')}.pdf`}
                    className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 inline-block shadow-lg"
                  >
                    Descargar PDF
                  </a>
                </>
              ) : (
                <button 
                  disabled 
                  className="bg-gray-300 text-gray-500 px-6 py-2 rounded-lg font-bold cursor-not-allowed"
                >
                  PDF no disponible
                </button>
              )}
            </div>
          </div>
          
          {article.pdfUrl && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                Vista Previa del Documento
              </h2>
              <iframe
                src={article.pdfUrl}
                title={`Vista previa de ${article.title}`}
                className="w-full h-screen rounded-lg shadow-inner border"
              >
                Tu navegador no soporta la visualización de PDFs.
              </iframe>
            </section>
          )}

          <div className="mt-8 pt-6 border-t flex justify-between">
            {Number(id) > 1 ? (
              <Link to={`/article/${Number(id) - 1}`} className="text-gray-600 hover:text-black font-semibold">
                &larr; Artículo Anterior
              </Link>
            ) : (
              <div></div>
            )}
            
            {Number(id) < articles.length && (
              <Link to={`/article/${Number(id) + 1}`} className="text-gray-600 hover:text-black font-semibold">
                Artículo Siguiente &rarr;
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}