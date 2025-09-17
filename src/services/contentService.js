import { articlesData, videosData, noticiasData } from '../data/mockData';

const fakeNetworkDelay = (ms) => new Promise(res => setTimeout(res, ms));

const handleFileUpload = (item) => {
  if (item.pdfFile instanceof File) {
    item.pdfUrl = URL.createObjectURL(item.pdfFile);
    // FUTURO: Aquí iría la lógica para subir el archivo al backend
  }
  return item;
}

export const contentService = {
  getAllContent: async () => {
    console.log("Fetching all content from MOCK DATA...");
    await fakeNetworkDelay(500);
    return {
      articles: articlesData,
      videos: videosData,
      news: noticiasData,
    };
  },
  createContent: async (newItem, type) => {
    console.log(`Creating new ${type} with MOCK DATA...`, newItem);
    await fakeNetworkDelay(300);
    newItem = handleFileUpload(newItem);
    return { ...newItem, id: Date.now() };
  },
  updateContent: async (updatedItem, type) => {
    console.log(`Updating ${type} with MOCK DATA...`, updatedItem);
    await fakeNetworkDelay(300);
    updatedItem = handleFileUpload(updatedItem);
    return updatedItem;
  },
  deleteContent: async (id, type) => {
    console.log(`Deleting ${type} with id ${id} from MOCK DATA...`);
    await fakeNetworkDelay(300);
    return { success: true };
  }
};