// src/App.jsx

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import ArticlePage from "./pages/ArticlePage";
import Admin from "./pages/Admin";
// --- CAMBIO AQUÍ ---
import AdminLoginPage from "./pages/AdminLoginPage.jsx"; // Importamos el nuevo nombre

function App() {
  const [search, setSearch] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        {/* --- Y CAMBIO AQUÍ --- */}
        <Route path="/login" element={<AdminLoginPage onLogin={handleLogin} />} />

        {/* Rutas Públicas dentro del Layout */}
        <Route path="/" element={<Layout search={search} setSearch={setSearch} />}>
          <Route index element={<Home />} />
          <Route path="articles" element={<Articles search={search} />} />
          <Route path="article/:id" element={<ArticlePage />} />
        </Route>

        {/* Ruta Protegida para el Admin */}
        <Route 
          path="/admin" 
          element={
            isAuthenticated ? <Admin /> : <Navigate to="/login" />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;