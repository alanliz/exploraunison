import { useState } from "react";

function Admin() {
  const [articles, setArticles] = useState([]);

  const handleChange = (index, field, value) => {
    const newArticles = [...articles];
    newArticles[index][field] = value;
    setArticles(newArticles);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      {articles.map((article, index) => (
        <div key={article.id} className="bg-white p-4 mb-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">{article.title}</h2>
          <label className="block mb-2">
            Título:
            <input
              type="text"
              value={article.title}
              onChange={(e) => handleChange(index, "title", e.target.value)}
              className="border p-2 rounded w-full"
            />
          </label>
          <label className="block mb-2">
            Autor:
            <input
              type="text"
              value={article.author}
              onChange={(e) => handleChange(index, "author", e.target.value)}
              className="border p-2 rounded w-full"
            />
          </label>
          {/* Repeat inputs for other fields */}
        </div>
      ))}
    </div>
  );
}

export default Admin;