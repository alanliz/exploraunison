import { useState } from "react";
import AddContentDropdown from "../components/AddContentDropdown";

export default function Admin() {
  const [articles, setArticles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [news, setNews] = useState([]);

  return (
    <div className="container mx-auto p-4 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      {/* Dropdown Button */}
      <AddContentDropdown
        addArticle={(item) => setArticles([...articles, item])}
        addVideo={(item) => setVideos([...videos, item])}
        addNews={(item) => setNews([...news, item])}
      />

      {/* Table/List */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Lista de Contenidos</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Tipo</th>
            <th className="border p-2">Título</th>
            <th className="border p-2">Autor</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((item) => (
            <tr key={item.id}>
              <td className="border p-2">Artículo</td>
              <td className="border p-2">{item.title}</td>
              <td className="border p-2">{item.author}</td>
            </tr>
          ))}
          {videos.map((item) => (
            <tr key={item.id}>
              <td className="border p-2">Video</td>
              <td className="border p-2">{item.title}</td>
              <td className="border p-2">{item.author}</td>
            </tr>
          ))}
          {news.map((item) => (
            <tr key={item.id}>
              <td className="border p-2">Noticia</td>
              <td className="border p-2">{item.title}</td>
              <td className="border p-2">{item.author}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
