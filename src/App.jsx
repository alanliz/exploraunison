// src/App.jsx

import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import ArticlePage from "./pages/ArticlePage";
import Admin from "./pages/Admin";
import AdminLoginPage from "./pages/AdminLoginPage";

function App() {
  const [search, setSearch] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

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
        
        <Route path="/" element={<Layout search={search} setSearch={setSearch} />}>
          <Route index element={<Home />} />
          <Route path="articles" element={<Articles search={search} />} />
          <Route path="article/:id" element={<ArticlePage />} />
        </Route>

        <Route 
          path="/admin" 
          element={
            isAuthenticated ? <Admin onLogout={handleLogout} /> : <Navigate to="/login" />
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