import { useState } from "react";
import AddContentDropdown from "../components/AddContentDropdown";

export default function Admin() {
  const [articles, setArticles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [news, setNews] = useState([]);
  const [activeTable, setActiveTable] = useState("Artículos"); // default table

  const renderTable = () => {
    if (activeTable === "Artículos") {
      return (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border p-2">Título</th>
              <th className="border p-2">Autor</th>
              <th className="border p-2">Volumen</th>
              <th className="border p-2">Número</th>
              <th className="border p-2">Fecha</th>
              <th className="border p-2">Páginas</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((item) => (
              <tr key={item.id}>
                <td className="border p-2">{item.title}</td>
                <td className="border p-2">{item.author}</td>
                <td className="border p-2">{item.volume}</td>
                <td className="border p-2">{item.number}</td>
                <td className="border p-2">{item.date}</td>
                <td className="border p-2">{item.pages}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (activeTable === "Videos") {
      return (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border p-2">Título</th>
              <th className="border p-2">Autor</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((item) => (
              <tr key={item.id}>
                <td className="border p-2">{item.title}</td>
                <td className="border p-2">{item.author}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else {
      return (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border p-2">Título</th>
              <th className="border p-2">Autor</th>
            </tr>
          </thead>
          <tbody>
            {news.map((item) => (
              <tr key={item.id}>
                <td className="border p-2">{item.title}</td>
                <td className="border p-2">{item.author}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  };

  return (
    <div className="container mx-auto p-4 text-gray-900">
      {/* Header + Add Button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Panel de Administrador</h1>
        <AddContentDropdown
          addArticle={(item) => setArticles([...articles, item])}
          addVideo={(item) => setVideos([...videos, item])}
          addNews={(item) => setNews([...news, item])}
        />
      </div>

      {/* Horizontal Navbar */}
      <div className="flex gap-6 border-b mb-6">
        {["Artículos", "Videos", "Noticias"].map((table) => (
          <button
            key={table}
            onClick={() => setActiveTable(table)}
            className={`pb-2 font-medium ${
              activeTable === table ? "border-b-2 border-blue-500" : "text-gray-600"
            }`}
          >
            {table}
          </button>
        ))}
      </div>

      {/* Table */}
      <h2 className="text-2xl font-bold mb-4">{activeTable}</h2>
      {renderTable()}
    </div>
  );
}
