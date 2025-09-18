import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { contentService } from "./services/contentService";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import ArticlePage from "./pages/ArticlePage";
import Admin from "./pages/Admin";
import AdminLoginPage from "./pages/AdminLoginPage";
import Videos from "./pages/Videos";
import Noticias from "./pages/Noticias";
import NoticiaPage from "./pages/NoticiaPage";
import { articlesData, videosData, noticiasData } from "./data/mockData";

function App() {
  const [search, setSearch] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // El estado se inicializa desde una función que revisa localStorage
  const [content, setContent] = useState(() => {
    try {
      const savedContent = localStorage.getItem('appContent');
      // Si hay datos guardados y no están vacíos, los usamos
      if (savedContent && savedContent !== 'null') {
        return JSON.parse(savedContent);
      }
    } catch (error) {
      console.error("Error al leer de localStorage", error);
    }
    // Si no hay nada guardado, usamos los datos iniciales del archivo mock
    return { articles: articlesData, videos: videosData, news: noticiasData };
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Este efecto guarda los cambios en localStorage cada vez que 'content' se actualiza
  useEffect(() => {
    try {
      // Antes de guardar, creamos una copia y quitamos los archivos temporales (File objects)
      const contentToStore = JSON.stringify(content, (key, value) => {
        if (key === 'pdfFile' || key === 'imageFile') {
          return undefined; // Excluye estas propiedades del JSON para evitar errores
        }
        return value;
      });
      localStorage.setItem('appContent', contentToStore);
    } catch (error) {
      console.error("Error al guardar en localStorage", error);
    }
  }, [content]);

  const keyMap = { Artículo: 'articles', Video: 'videos', Noticia: 'news' };

  const handleAddContent = async (newContent, type) => {
    const createdItem = await contentService.createContent(newContent, type);
    const key = keyMap[type];
    setContent(prev => ({ ...prev, [key]: [createdItem, ...prev[key]] }));
  };

  const handleUpdateContent = async (updatedContent, type) => {
    const updatedItem = await contentService.updateContent(updatedContent, type);
    const key = keyMap[type];
    setContent(prev => ({
      ...prev,
      [key]: prev[key].map(item => item.id === updatedItem.id ? updatedItem : item)
    }));
  };

  const handleDeleteContent = async (id, type) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar este ${type.toLowerCase()}?`)) {
      await contentService.deleteContent(id, type);
      const key = keyMap[type];
      setContent(prev => ({ ...prev, [key]: prev[key].filter(item => item.id !== id) }));
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate("/admin");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <Routes>
      <Route path="/login" element={<AdminLoginPage onLogin={handleLogin} />} />
      <Route path="/" element={<Layout search={search} setSearch={setSearch} content={content} loading={loading} />}>
        <Route index element={<Home />} />
        <Route path="articles" element={<Articles search={search} />} />
        <Route path="article/:id" element={<ArticlePage />} />
        <Route path="videos" element={<Videos />} />
        <Route path="noticias" element={<Noticias />} />
        <Route path="noticia/:id" element={<NoticiaPage />} />
      </Route>
      <Route
        path="/admin"
        element={
          isAuthenticated
            ? <Admin
                onLogout={handleLogout}
                content={content}
                loading={loading}
                onAddContent={handleAddContent}
                onUpdateContent={handleUpdateContent}
                onDeleteContent={handleDeleteContent}
              />
            : <Navigate to="/login" />
        }
      />
    </Routes>
  );
}

function AppWrapper() {
  return (
    <Router>
      <ScrollToTop />
      <App />
    </Router>
  );
}

export default AppWrapper;