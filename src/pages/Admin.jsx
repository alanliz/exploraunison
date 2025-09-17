// src/pages/Admin.jsx (CORREGIDO)

import { useState, useEffect } from "react";
import AdminHeader from "../components/AdminHeader";
import AddContentModal from "../components/AddContentModal";
import { articlesData, videosData, noticiasData } from "../data/mockData";

export default function Admin({ onLogout }) {
  const [activeTab, setActiveTab] = useState("articulos");
  const [content, setContent] = useState({ articles: [], videos: [], news: [] });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contentToEdit, setContentToEdit] = useState(null);

  useEffect(() => {
    setContent({
      articles: articlesData,
      videos: videosData,
      news: noticiasData
    });
  }, []);

  // Objeto para mapear la pestaña activa a la clave correcta en el estado
  const keyMap = {
    articulos: 'articles',
    videos: 'videos',
    noticias: 'news',
  };

  const handleAddContent = (newContent) => {
    const key = keyMap[activeTab];
    setContent(prev => ({ ...prev, [key]: [newContent, ...prev[key]] }));
  };

  const handleUpdateContent = (updatedContent) => {
    const key = keyMap[activeTab];
    setContent(prev => ({
      ...prev,
      [key]: prev[key].map(item => item.id === updatedContent.id ? updatedContent : item)
    }));
  };

  const handleDeleteContent = (id) => {
    const contentName = activeTab.slice(0, -1);
    if (window.confirm(`¿Estás seguro de que quieres eliminar este ${contentName}?`)) {
      const key = keyMap[activeTab];
      setContent(prev => ({
        ...prev,
        [key]: prev[key].filter(item => item.id !== id)
      }));
    }
  };
  
  const handleOpenEditModal = (content) => {
    setContentToEdit(content);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setContentToEdit(null);
  };
  
  const getModalType = () => {
    if (activeTab === 'articulos') return 'Artículo';
    if (activeTab === 'videos') return 'Video';
    if (activeTab === 'noticias') return 'Noticia';
  };


  return (
    <div className="bg-gray-50 min-h-screen">
      <AdminHeader onLogout={onLogout} />
      
      <div className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Gestión de Contenido</h1>
          <button onClick={() => handleOpenEditModal(null)} className="bg-blue-600 text-white px-5 py-2 rounded-lg font-bold hover:bg-blue-700 shadow transition-transform transform hover:scale-105">
            + Agregar contenido
          </button>
        </div>

        <div className="border-b border-gray-200 mb-6">
           <nav className="flex space-x-4">
            <button onClick={() => setActiveTab("articulos")} className={`py-2 px-4 font-semibold ${activeTab === 'articulos' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
              Artículos
            </button>
            <button onClick={() => setActiveTab("videos")} className={`py-2 px-4 font-semibold ${activeTab === 'videos' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
              Videos
            </button>
            <button onClick={() => setActiveTab("noticias")} className={`py-2 px-4 font-semibold ${activeTab === 'noticias' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
              Noticias
            </button>
          </nav>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          {activeTab === 'articulos' && (
            <table className="min-w-full text-left">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="p-4 font-bold uppercase text-xs text-gray-500">Título</th>
                  <th className="p-4 font-bold uppercase text-xs text-gray-500">Autor</th>
                  <th className="p-4 font-bold uppercase text-xs text-gray-500 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {content.articles.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-800">{item.title}</td>
                    <td className="p-4 text-gray-600">{item.author}</td>
                    <td className="p-4 space-x-4 text-right">
                      <button onClick={() => handleOpenEditModal(item)} className="text-blue-600 hover:underline font-semibold">Editar</button>
                      <button onClick={() => handleDeleteContent(item.id)} className="text-red-600 hover:underline font-semibold">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          
          {activeTab === 'videos' && (
            <table className="min-w-full text-left">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="p-4 font-bold uppercase text-xs text-gray-500">Título del Video</th>
                  <th className="p-4 font-bold uppercase text-xs text-gray-500 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {content.videos.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-800">{item.title}</td>
                    <td className="p-4 space-x-4 text-right">
                      <button onClick={() => handleOpenEditModal(item)} className="text-blue-600 hover:underline font-semibold">Editar</button>
                      <button onClick={() => handleDeleteContent(item.id)} className="text-red-600 hover:underline font-semibold">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'noticias' && (
             <table className="min-w-full text-left">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="p-4 font-bold uppercase text-xs text-gray-500">Título de la Noticia</th>
                  <th className="p-4 font-bold uppercase text-xs text-gray-500 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {content.news.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-800">{item.title}</td>
                    <td className="p-4 space-x-4 text-right">
                      <button onClick={() => handleOpenEditModal(item)} className="text-blue-600 hover:underline font-semibold">Editar</button>
                      <button onClick={() => handleDeleteContent(item.id)} className="text-red-600 hover:underline font-semibold">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {isModalOpen && (
        <AddContentModal
          type={getModalType()}
          onClose={handleCloseModal}
          contentToEdit={contentToEdit}
          addContent={handleAddContent}
          updateContent={handleUpdateContent}
        />
      )}
    </div>
  );
}