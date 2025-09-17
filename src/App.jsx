import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { contentService } from "./services/contentService";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import ArticlePage from "./pages/ArticlePage";
import Admin from "./pages/Admin";
import AdminLoginPage from "./pages/AdminLoginPage";
import Videos from "./pages/Videos";
import Noticias from "./pages/Noticias";

function App() {
  const [search, setSearch] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const [content, setContent] = useState({ articles: [], videos: [], news: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        const initialContent = await contentService.getAllContent();
        setContent(initialContent);
        setError(null);
      } catch (err) {
        setError("No se pudo cargar el contenido.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, []);

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
    await contentService.deleteContent(id, type);
    const key = keyMap[type];
    setContent(prev => ({ ...prev, [key]: prev[key].filter(item => item.id !== id) }));
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
      <App />
    </Router>
  );
}

export default AppWrapper;