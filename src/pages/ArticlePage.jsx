import { useParams, Link } from "react-router-dom";

function ArticlePage() {
  const { id } = useParams();

  return (
    <main className="w-full p-4">
      <article className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Artículo {id}</h2>
        <img
          src={`https://picsum.photos/seed/article-${id}/800/400`}
          alt={`Imagen del artículo ${id}`}
          className="mb-4 rounded-lg"
        />
        <p className="text-lg mb-4">
          Este es el contenido completo del artículo {id}. Aquí se puede agregar
          el texto detallado con explicaciones, imágenes, citas, etc.
        </p>
        <Link to="/articles" className="text-blue-600 hover:underline">
          ← Volver a artículos
        </Link>
      </article>
    </main>
  );
}

export default ArticlePage;
