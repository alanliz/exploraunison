// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"; // Importamos el Layout
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import ArticlePage from "./pages/ArticlePage";
import Admin from "./pages/Admin";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");

  return (
    <Router>
      <Routes>
        {/* Creamos una ruta padre que usa el Layout */}
        <Route path="/" element={<Layout search={search} setSearch={setSearch} />}>
          {/* Todas estas rutas se renderizarán dentro del Outlet del Layout */}
          <Route index element={<Home />} />
          <Route path="articles" element={<Articles search={search} />} />
          <Route path="article/:id" element={<ArticlePage />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;