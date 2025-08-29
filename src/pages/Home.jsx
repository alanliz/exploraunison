function Home() {
  return (
    <main className="w-full p-4 bg-[#F5F5F5] text-textprimary">
      <section className="mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4 ">
            Bienvenidos a la Revista Explora Unison
          </h2>
          <p className="text-lg mb-4">
            Publicación digital de artículos, investigaciones y contenidos educativos de fácil acceso.
          </p>
          <h2 className="text-2xl font-bold mb-4">Quiénes Somos</h2>
          <p className="text-lg">
            Somos una revista digital de divulgación científica de la Universidad de Sonora, enfocada en la ingeniería y el futuro.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Videos de Ingeniería</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((num) => (
              <div key={num} className="bg-gray-200 p-4 rounded-lg">
                <iframe
                  className="mb-4 rounded-lg"
                  width="100%"
                  height="200"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title={`Video de ingeniería ${num}`}
                ></iframe>
                <h3 className="text-xl font-bold mb-2">Video {num}</h3>
                <p className="text-lg">Descripción breve del video {num}.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Noticias de Ingeniería</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gray-200 p-4 rounded-lg">
              <img
                src="https://storage.googleapis.com/a1aa/image/VtGJfYUypxxzfELAbjx1FVIUiX925OX4GNtkZkeSMqY7gcwnA.jpg"
                alt="Imagen de un laboratorio de ingeniería con equipos modernos"
                className="mb-4 rounded-lg"
                width="300"
                height="200"
              />
              <h3 className="text-xl font-bold mb-2">Noticia 1</h3>
              <p className="text-lg">Descripción breve de la noticia 1.</p>
            </div>

            <div className="bg-gray-200 p-4 rounded-lg">
              <img
                src="https://storage.googleapis.com/a1aa/image/NowRh2uEJeWJXScm6XngB5hI91H8zAVjMZSfIxPRZuNegcwnA.jpg"
                alt="Imagen de estudiantes trabajando en un proyecto de ingeniería"
                className="mb-4 rounded-lg"
                width="300"
                height="200"
              />
              <h3 className="text-xl font-bold mb-2">Noticia 2</h3>
              <p className="text-lg">Descripción breve de la noticia 2.</p>
            </div>

            <div className="bg-gray-200 p-4 rounded-lg">
              <img
                src="https://storage.googleapis.com/a1aa/image/5OJdJ9WXnGb5GJwEb65VteGu7ut8RqgTm2ni7WeWJN7fgcwnA.jpg"
                alt="Imagen de un robot industrial en funcionamiento"
                className="mb-4 rounded-lg"
                width="300"
                height="200"
              />
              <h3 className="text-xl font-bold mb-2">Noticia 3</h3>
              <p className="text-lg">Descripción breve de la noticia 3.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;