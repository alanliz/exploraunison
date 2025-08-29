import { useParams, Link } from "react-router-dom";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

// example articles data
const articles = [
  {
    id: "1",
    title: "Innovación en la Ingeniería Industrial",
    volume: 5,
    number: 2,
    date: "01/01/2023",
    author: "Dr. Juan Pérez",
    pages: 15,
    abstract:
      "Este artículo explora las últimas innovaciones en la ingeniería industrial...",
    img: "https://storage.googleapis.com/a1aa/image/520VHyBTuK5tIdDYRNDPeCt5kfGwzDc1Xw5NQE8H3cohVO4TA.jpg",
    pdf: "path/to/article1.pdf",
  },
  {
    id: "2",
    title: "Robótica en la Mecatrónica",
    volume: 5,
    number: 3,
    date: "15/02/2023",
    author: "Dra. María López",
    pages: 12,
    abstract:
      "Artículo sobre robótica aplicada a la mecatrónica y su impacto en la industria moderna.",
    img: "https://storage.googleapis.com/a1aa/image/xP1JcT3n7e2YVSZbeBaolYnv1bfbEio3FaKNqsQmueR1V5gPB.jpg",
    pdf: "path/to/article2.pdf",
  },
];

function ArticlePage() {
  const { id } = useParams();
  const index = articles.findIndex((a) => a.id === id);
  const article = articles[index];

  if (!article) return <p>Artículo no encontrado</p>;

  const prevArticle = articles[index - 1];
  const nextArticle = articles[index + 1];

  return (
    <section className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">{article.title}</h2>
        <div className="flex flex-col md:flex-row">
          <img
            src={article.img}
            alt={`Portada del artículo ${article.title}`}
            className="mb-4 rounded-lg md:mb-0 md:mr-6"
            height={300}
            width={300}
          />
          <div>
            <p className="text-lg mb-2"><strong>Nombre:</strong> {article.title}</p>
            <p className="text-lg mb-2"><strong>Volumen:</strong> {article.volume}</p>
            <p className="text-lg mb-2"><strong>Número:</strong> {article.number}</p>
            <p className="text-lg mb-2"><strong>Fecha:</strong> {article.date}</p>
            <p className="text-lg mb-2"><strong>Autor:</strong> {article.author}</p>
            <p className="text-lg mb-2"><strong>Páginas:</strong> {article.pages}</p>
            <p className="text-lg mb-4"><strong>Abstract:</strong> {article.abstract}</p>
            <a
              href={article.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#D5433C] text-white px-4 py-2 rounded-lg hover:bg-[#E1B73D]"
            >
              Descargar PDF
            </a>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          {prevArticle ? (
            <Link
              to={`/article/${prevArticle.id}`}
              className="bg-gray-300 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-400 flex items-center"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Artículo Anterior
            </Link>
          ) : (
            <div />
          )}

          {nextArticle ? (
            <Link
              to={`/article/${nextArticle.id}`}
              className="bg-gray-300 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-400 flex items-center"
            >
              Siguiente Artículo
              <ArrowRightIcon className="h-5 w-5 ml-2" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </section>
  );
}

export default ArticlePage;
