import { Link } from "react-router-dom";

function Articles() {
  return (
    <main className="w-full p-4">
      <section className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Artículos Recientes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((id) => (
            <div key={id} className="bg-gray-200 p-4 rounded-lg">
              <img
                src={`https://picsum.photos/seed/${id}/400/200`}
                alt={`Imagen para el artículo ${id}`}
                className="mb-4 rounded-lg"
              />
              <h3 className="text-xl font-bold mb-2">Artículo {id}</h3>
              <p className="text-lg mb-2">
                Descripción breve del artículo {id}.
              </p>
              <Link
                to={`/article/${id}`}
                className="text-blue-600 hover:underline"
              >
                Leer más
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Articles;
