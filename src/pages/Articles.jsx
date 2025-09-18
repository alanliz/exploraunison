import React, { useMemo, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { ChevronDownIcon, XCircleIcon } from "@heroicons/react/24/solid";

// --- COMPONENTE HIJO: Define CÓMO se ve UNA tarjeta ---
function ArticleCard({ id, title, author, date, abstract }) {
  // Truncamos el abstract para mostrar un fragmento
  const shortAbstract = abstract?.split(' ').slice(0, 25).join(' ') + '...';

  return (
    <Link to={`/article/${id}`} className="block h-full">
      <div className="bg-white p-6 h-full rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer flex flex-col">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
        <div className="text-sm text-gray-500 mb-4">
          <span>Por: <strong>{author}</strong></span>
          <span className="mx-2">|</span>
          <span>{date}</span>
        </div>
        <p className="text-gray-600 flex-grow">{shortAbstract}</p>
        <span className="text-blue-600 font-semibold mt-4 self-start">
          Leer más &rarr;
        </span>
      </div>
    </Link>
  );
}

// --- COMPONENTE PADRE: Define la PÁGINA completa y usa ArticleCard ---
export default function Articles({ search }) {
  const { content, loading } = useOutletContext();
  const articles = content.articles || [];

  const [filterVolume, setFilterVolume] = useState('todos');
  const [filterNumber, setFilterNumber] = useState('todos');

  // Generar opciones para los filtros dinámicamente
  const volumes = useMemo(() => {
    if (!articles) return [];
    const uniqueVolumes = new Set(articles.map(a => a.volume));
    return Array.from(uniqueVolumes).sort((a, b) => a - b);
  }, [articles]);

  const numbers = useMemo(() => {
    if (!articles) return [];
    const uniqueNumbers = new Set(articles.map(a => a.number));
    return Array.from(uniqueNumbers).sort((a, b) => a - b);
  }, [articles]);

  // Lógica de filtrado actualizada
  const filteredArticles = useMemo(() => {
    const normalizeText = (text) => text?.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") || "";
    const normalizedSearch = normalizeText(search);

    return articles.filter(article => {
      const matchesSearch = normalizedSearch 
        ? normalizeText(article.title).includes(normalizedSearch) || normalizeText(article.author).includes(normalizedSearch)
        : true;
      
      const matchesVolume = filterVolume !== 'todos' ? article.volume == filterVolume : true;
      const matchesNumber = filterNumber !== 'todos' ? article.number == filterNumber : true;

      return matchesSearch && matchesVolume && matchesNumber;
    });
  }, [search, articles, filterVolume, filterNumber]);

  if (loading) {
    return <div className="text-center p-8">Cargando artículos...</div>;
  }

  const handleResetFilters = () => {
    setFilterVolume('todos');
    setFilterNumber('todos');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="container mx-auto p-4 md:p-8">
        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Todos los Artículos</h2>
          
          <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Filtros de Búsqueda</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Filtro por Volumen */}
              <div className="relative">
                <select 
                  value={filterVolume} 
                  onChange={e => setFilterVolume(e.target.value)} 
                  className="w-full appearance-none border-gray-300 rounded-lg shadow-sm pl-4 pr-10 py-2 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="todos">Todos los Volúmenes</option>
                  {volumes.map(v => <option key={v} value={v}>Volumen {v}</option>)}
                </select>
                <ChevronDownIcon className="h-5 w-5 text-gray-400 absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none" />
              </div>
              
              {/* Filtro por Número */}
              <div className="relative">
                <select 
                  value={filterNumber} 
                  onChange={e => setFilterNumber(e.target.value)} 
                  className="w-full appearance-none border-gray-300 rounded-lg shadow-sm pl-4 pr-10 py-2 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="todos">Todos los Números</option>
                  {numbers.map(n => <option key={n} value={n}>Número {n}</option>)}
                </select>
                <ChevronDownIcon className="h-5 w-5 text-gray-400 absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Botón de Limpiar */}
              <button 
                onClick={handleResetFilters} 
                className="flex items-center justify-center bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                <XCircleIcon className="h-5 w-5 mr-2" />
                Limpiar Filtros
              </button>
            </div>
          </div>
          
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  id={article.id}
                  title={article.title}
                  author={article.author}
                  date={article.date}
                  abstract={article.abstract}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-lg py-8">
              No se encontraron artículos que coincidan con los filtros seleccionados.
            </p>
          )}
        </section>
      </main>
    </div>
  );
}