// src/pages/Admin.jsx

import { useState, useEffect } from "react";
import AddContentModal from "../components/AddContentModal";
import { articlesData, videosData, noticiasData } from "../data/mockData";

export default function Admin() {
  // --- ESTADOS ---
  // Estado para la pestaña activa (articulos, videos, noticias)
  const [activeTab, setActiveTab] = useState("articulos");
  // Estados para guardar los datos
  const [articles, setArticles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [news, setNews] = useState([]);
  // Estado para controlar la visibilidad del modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- EFECTOS ---
  // Cargar los datos iniciales desde mockData.js
  useEffect(() => {
    setArticles(articlesData);
    setVideos(videosData);
    setNews(noticiasData);
  }, []);

  // --- MANEJADORES DE EVENTOS ---
  const handleAddArticle = (newArticle) => {
    // Agrega el nuevo artículo al principio de la lista
    setArticles([newArticle, ...articles]);
    console.log("Nuevo artículo agregado:", newArticle);
  };

  // (Funciones placeholder para videos y noticias)
  const handleAddVideo = (newVideo) => console.log("Nuevo video:", newVideo);
  const handleAddNews = (newNews) => console.log("Nueva noticia:", newNews);

  // --- RENDERIZADO DEL COMPONENTE ---
  const getModalType = () => {
    if (activeTab === 'articulos') return 'Artículo';
    if (activeTab === 'videos') return 'Video';
    if (activeTab === 'noticias') return 'Noticia';
  };

  return (
    <>
      <div className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Panel de Administrador</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-600 transition-colors"
          >
            + Agregar contenido
          </button>
        </div>

        {/* Pestañas de Navegación */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-4">
            <button onClick={() => setActiveTab("articulos")} className={`py-2 px-4 font-semibold ${activeTab === 'articulos' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}>
              Artículos
            </button>
            <button onClick={() => setActiveTab("videos")} className={`py-2 px-4 font-semibold ${activeTab === 'videos' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}>
              Videos
            </button>
            <button onClick={() => setActiveTab("noticias")} className={`py-2 px-4 font-semibold ${activeTab === 'noticias' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}>
              Noticias
            </button>
          </nav>
        </div>

        {/* Contenido de las Pestañas */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {activeTab === 'articulos' && (
            <table className="min-w-full text-left">
              <thead className="border-b">
                <tr>
                  <th className="p-4">Título</th>
                  <th className="p-4">Autor</th>
                  <th className="p-4">Fecha</th>
                  <th className="p-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{article.title}</td>
                    <td className="p-4">{article.author}</td>
                    <td className="p-4">{article.date}</td>
                    <td className="p-4 space-x-2">
                      <button className="text-blue-600 hover:underline">Editar</button>
                      <button className="text-red-600 hover:underline">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {activeTab === 'videos' && <p>Aquí se mostrará la tabla de videos.</p>}
          {activeTab === 'noticias' && <p>Aquí se mostrará la tabla de noticias.</p>}
        </div>
      </div>

      {/* Modal para agregar contenido */}
      {isModalOpen && (
        <AddContentModal
          type={getModalType()}
          onClose={() => setIsModalOpen(false)}
          addArticle={handleAddArticle}
          addVideo={handleAddVideo}
          addNews={handleAddNews}
        />
      )}
    </>
  );
}