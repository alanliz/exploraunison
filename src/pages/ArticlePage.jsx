import { useParams, Link } from "react-router-dom";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

// Sample articles array
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
    pdf: "#",
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
    pdf: "#",
  },
];

export default function ArticlePage() {
  const { id } = useParams();
  const index = articles.findIndex((a) => a.id === id);
  const article = articles[index];

  if (!article) return <p className="p-4">Artículo no encontrado</p>;

  const prevArticle = articles[index - 1];
  const nextArticle = articles[index + 1];

  return (
    <div className="bg-background min-h-screen p-4">
      <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">{article.title}</h2>
        <div className="flex flex-col md:flex-row">
          <img
            src={article.img}
            alt={article.title}
            className="mb-4 rounded-lg md:mb-0 md:mr-6"
            width={300}
            height={300}
          />
          <div>
            <p><strong>Volumen:</strong> {article.volume}</p>
            <p><strong>Número:</strong> {article.number}</p>
            <p><strong>Fecha:</strong> {article.date}</p>
            <p><strong>Autor:</strong> {article.author}</p>
            <p><strong>Páginas:</strong> {article.pages}</p>
            <p><strong>Abstract:</strong> {article.abstract}</p>
            <a
              href={article.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block bg-[#D5433C] text-white px-4 py-2 rounded hover:bg-[#E1B73D]"
            >
              Descargar PDF
            </a>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          {prevArticle ? (
            <Link
              to={`/article/${prevArticle.id}`}
              className="flex items-center gap-2 bg-gray-300 text-gray-900 px-4 py-2 rounded hover:bg-gray-400"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Artículo Anterior
            </Link>
          ) : (
            <div />
          )}

          {nextArticle ? (
            <Link
              to={`/article/${nextArticle.id}`}
              className="flex items-center gap-2 bg-gray-300 text-gray-900 px-4 py-2 rounded hover:bg-gray-400"
            >
              Siguiente Artículo
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
