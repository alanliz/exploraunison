import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import ArticlePage from "./pages/ArticlePage";
import Admin from "./pages/Admin";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
        <Header search={search} setSearch={setSearch} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<Articles search={search} />} />
            <Route path="/article/:id" element={<ArticlePage />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;