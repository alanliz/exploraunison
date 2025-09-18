import { articlesData, videosData, noticiasData } from '../data/mockData';

const fakeNetworkDelay = (ms) => new Promise(res => setTimeout(res, ms));

// --- NUEVA FUNCIÓN ---
// Extrae el ID de cualquier formato de URL de YouTube
function getYoutubeId(url) {
  if (!url) return '';
  // Expresión regular para encontrar el ID en varios formatos de URL
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  // Si encuentra una coincidencia y el ID tiene 11 caracteres, lo devuelve.
  // Si no, asume que el texto ingresado ya era el ID.
  return (match && match[2].length === 11) ? match[2] : url;
}

const handleFileUpload = (item) => {
  if (item.pdfFile instanceof File) {
    item.pdfUrl = URL.createObjectURL(item.pdfFile);
  }
  if (item.imageFile instanceof File) {
    item.imageUrl = URL.createObjectURL(item.imageFile);
  }
  return item;
}

export const contentService = {
  getAllContent: async () => {
    console.log("Fetching all content from MOCK DATA...");
    await fakeNetworkDelay(500);
    return { articles: articlesData, videos: videosData, news: noticiasData };
  },

  createContent: async (newItem, type) => {
    console.log(`Creating new ${type} with MOCK DATA...`, newItem);
    await fakeNetworkDelay(300);
    
    // --- CAMBIO: Procesamos el ID de YouTube si es un video ---
    if (type === 'Video') {
      newItem.videoId = getYoutubeId(newItem.videoId);
    }
    
    newItem = handleFileUpload(newItem);
    return { ...newItem, id: Date.now() };
  },
  
  updateContent: async (updatedItem, type) => {
    console.log(`Updating ${type} with MOCK DATA...`, updatedItem);
    await fakeNetworkDelay(300);
    
    // --- CAMBIO: Procesamos el ID de YouTube si es un video ---
    if (type === 'Video') {
      updatedItem.videoId = getYoutubeId(updatedItem.videoId);
    }

    updatedItem = handleFileUpload(updatedItem);
    return updatedItem;
  },
  
  deleteContent: async (id, type) => {
    console.log(`Deleting ${type} with id ${id} from MOCK DATA...`);
    await fakeNetworkDelay(300);
    return { success: true };
  }
};