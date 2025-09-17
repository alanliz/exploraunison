// src/pages/Home.jsx

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { videosData, noticiasData } from "../data/mockData"; // Importamos nuestros datos

function Home() {
  // Usamos el estado para guardar nuestros datos (buena práctica para cuando usemos un backend)
  const [videos, setVideos] = useState([]);
  const [noticias, setNoticias] = useState([]);

  // useEffect simula la carga de datos cuando el componente se monta
  useEffect(() => {
    // En el futuro, aquí harías la llamada a tu backend.
    // Por ahora, solo cargamos los datos del archivo local.
    setVideos(videosData.slice(0, 3)); // Mostramos solo los primeros 3
    setNoticias(noticiasData.slice(0, 3));
  }, []); // El array vacío [] asegura que esto solo se ejecute una vez

  return (
    <main className="container mx-auto p-4 bg-[#F5F5F5] text-textprimary">
      {/* Intro */}
      <section className="mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4 ">
            Bienvenidos a la Revista Explora Unison
          </h2>
          <p className="text-lg mb-4">
            Publicación digital de artículos, investigaciones y contenidos
            educativos de fácil acceso.
          </p>
          <h2 className="text-2xl font-bold mb-4">Quiénes Somos</h2>
          <p className="text-lg">
            Somos una revista digital de divulgación científica de la Universidad
            de Sonora, enfocada en la ingeniería y el futuro.
          </p>
        </div>
      </section>

      {/* Videos */}
      <section className="mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Videos de Ingeniería</h2>
            <Link
              to="/videos"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Ver todos
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* AQUÍ ESTÁ LA MAGIA: Usamos .map() para crear los elementos dinámicamente */}
            {videos.map((video) => (
              <div key={video.id} className="bg-gray-200 p-4 rounded-lg">
                <iframe
                  className="mb-4 rounded-lg"
                  width="100%"
                  height="200"
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title={video.title}
                ></iframe>
                <h3 className="text-xl font-bold mb-2">{video.title}</h3>
                <p className="text-lg">{video.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Noticias */}
      <section className="mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Noticias de Ingeniería</h2>
            <Link
              to="/noticias"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Ver todas
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Hacemos lo mismo para las noticias */}
            {noticias.map((noticia) => (
              <div key={noticia.id} className="bg-gray-200 p-4 rounded-lg">
                <img
                  src={noticia.imageUrl}
                  alt={noticia.title}
                  className="mb-4 rounded-lg object-cover w-full h-48"
                />
                <h3 className="text-xl font-bold mb-2">{noticia.title}</h3>
                <p className="text-lg">{noticia.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;