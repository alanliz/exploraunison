// src/components/AddContentModal.jsx

import { useState, useEffect } from "react";

export default function AddContentModal({ 
  type, 
  onClose, 
  contentToEdit, 
  addContent, 
  updateContent 
}) {
  const [formData, setFormData] = useState({});
  const isEditing = !!contentToEdit;

  useEffect(() => {
    if (isEditing) {
      setFormData({ ...contentToEdit });
    } else {
      // Limpiamos el formulario si estamos en modo "Crear"
      setFormData({
        title: "", author: "", volume: "", number: "", date: "", pages: "",
        description: "", videoId: "", imageUrl: "", content: "", pdfFile: null,
      });
    }
  }, [contentToEdit, isEditing, type]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = () => {
    if (isEditing) {
      updateContent({ ...contentToEdit, ...formData });
    } else {
      addContent({ id: Date.now(), ...formData });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-3xl max-h-[95vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">{isEditing ? `Editar ${type}` : `Agregar ${type}`}</h2>
        
        <div className="space-y-4">
          {/* --- CAMPOS PARA ARTÍCULOS --- */}
          {type === 'Artículo' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                <input name="title" value={formData.title || ''} onChange={handleChange} className="border-gray-300 p-2 rounded-lg w-full shadow-sm" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Autor</label>
                <input name="author" value={formData.author || ''} onChange={handleChange} className="border-gray-300 p-2 rounded-lg w-full shadow-sm" />
              </div>
              
              {/* --- CAMPOS DETALLADOS RESTAURADOS --- */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Volumen</label>
                <input name="volume" type="number" value={formData.volume || ''} onChange={handleChange} className="border-gray-300 p-2 rounded-lg w-full shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Número</label>
                <input name="number" type="number" value={formData.number || ''} onChange={handleChange} className="border-gray-300 p-2 rounded-lg w-full shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Publicación</label>
                <input name="date" type="date" value={formData.date || ''} onChange={handleChange} className="border-gray-300 p-2 rounded-lg w-full shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Páginas</label>
                <input name="pages" type="number" value={formData.pages || ''} onChange={handleChange} className="border-gray-300 p-2 rounded-lg w-full shadow-sm" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Artículo (PDF)</label>
                <input name="pdfFile" type="file" accept="application/pdf" onChange={handleChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
              </div>
            </div>
          )}

          {/* --- CAMPOS PARA VIDEOS --- */}
          {type === 'Video' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                <input name="title" value={formData.title || ''} onChange={handleChange} className="border-gray-300 p-2 rounded-lg w-full shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción Breve</label>
                <textarea name="description" value={formData.description || ''} onChange={handleChange} className="border-gray-300 p-2 rounded-lg w-full shadow-sm" rows="3"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID del Video de YouTube</label>
                <input name="videoId" value={formData.videoId || ''} onChange={handleChange} className="border-gray-300 p-2 rounded-lg w-full shadow-sm" />
              </div>
            </div>
          )}

          {/* --- CAMPOS PARA NOTICIAS --- */}
          {type === 'Noticia' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                <input name="title" value={formData.title || ''} onChange={handleChange} className="border-gray-300 p-2 rounded-lg w-full shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción Breve (Resumen)</label>
                <textarea name="description" value={formData.description || ''} onChange={handleChange} className="border-gray-300 p-2 rounded-lg w-full shadow-sm" rows="3"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL de la Imagen</label>
                <input name="imageUrl" value={formData.imageUrl || ''} onChange={handleChange} className="border-gray-300 p-2 rounded-lg w-full shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contenido Completo de la Noticia</label>
                <textarea name="content" value={formData.content || ''} onChange={handleChange} className="border-gray-300 p-2 rounded-lg w-full shadow-sm" rows="6"></textarea>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button onClick={onClose} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300">Cancelar</button>
          <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700">{isEditing ? 'Guardar Cambios' : 'Agregar'}</button>
        </div>
      </div>
    </div>
  );
}