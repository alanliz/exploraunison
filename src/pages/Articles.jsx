import React from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

// ArticleCard component
function ArticleCard({ img, title, author, date, link }) {
  return (
    <div className="bg-gray-200 p-4 rounded-lg">
      <Link to={link}>
        <img
          src={img}
          alt={`Portada del artículo: ${title}`}
          className="mb-4 rounded-lg"
          width={300}
          height={200}
        />
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-lg">Autor: {author}</p>
        <p className="text-lg">Fecha de Publicación: {date}</p>
      </Link>
    </div>
  );
}

// Example data
const volumes = [
  {
    number: 1,
    volumes: [
      {
        number: 1,
        articles: [
          {
            title: "Innovación en la Ingeniería Industrial",
            author: "Dr. Juan Pérez",
            date: "01/01/2023",
            img: "https://storage.googleapis.com/a1aa/image/520VHyBTuK5tIdDYRNDPeCt5kfGwzDc1Xw5NQE8H3cohVO4TA.jpg",
            link: "/article/1",
          },
          {
            title: "Robótica en la Mecatrónica",
            author: "Dra. María López",
            date: "15/02/2023",
            img: "https://storage.googleapis.com/a1aa/image/xP1JcT3n7e2YVSZbeBaolYnv1bfbEio3FaKNqsQmueR1V5gPB.jpg",
            link: "/article/2",
          },
        ],
      },
      {
        number: 2,
        articles: [
          {
            title: "Inteligencia Artificial en Sistemas de Información",
            author: "Ing. Carlos García",
            date: "10/03/2023",
            img: "https://storage.googleapis.com/a1aa/image/Iksw2VHDjsI1GFWrCXi1XuQGsgZroFMefulGezf3KRXpV5gPB.jpg",
            link: "/article/3",
          },
          {
            title: "Energías Renovables en la Ingeniería",
            author: "Dra. Ana Martínez",
            date: "25/04/2023",
            img: "https://storage.googleapis.com/a1aa/image/d0hpepfKfRT5UJVCKQmUstb5x5wnjL8DfkEqVZgpecHZryBfE.jpg",
            link: "/article/4",
          },
        ],
      },
    ],
  },
  {
    number: 2,
    volumes: [
      {
        number: 1,
        articles: [
          {
            title: "Nanotecnología en la Ingeniería de Materiales",
            author: "Dr. Luis Fernández",
            date: "05/05/2023",
            img: "https://storage.googleapis.com/a1aa/image/gsRiXfy7pLVTUS7XL2fwVOiJW01eYEeFQ0pBfEpiHuiHsyBfE.jpg",
            link: "/article/5",
          },
          {
            title: "Ciberseguridad en Sistemas de Información",
            author: "Ing. Laura Sánchez",
            date: "20/06/2023",
            img: "https://storage.googleapis.com/a1aa/image/oEq1RfTlq72SCy4AyhKEOw0lO9ZRfZ3RGsro59DUqSzfqcwnA.jpg",
            link: "/article/6",
          },
        ],
      },
    ],
  },
];

export default function Articles({ search }) {
  // Safe filter function
  const filterArticles = (articles, volumeNumber, numberNumber) =>
    articles.filter(
      (article) =>
        (article.title?.toLowerCase() || "")
          .includes((search || "").toLowerCase()) ||
        (article.author?.toLowerCase() || "")
          .includes((search || "").toLowerCase()) ||
        volumeNumber.toString() === search ||
        numberNumber.toString() === search
    );

  return (
    <div className="bg-[#F5F5F5] min-h-screen flex flex-col">
      <main className="container mx-auto p-4 flex-grow">
        <section className="mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-4">
              Artículos por Volumen y Número
            </h2>

            {volumes.map((vol) => (
              <div key={vol.number} className="space-y-8">
                <h3 className="text-2xl font-bold mb-4">Volumen {vol.number}</h3>

                {vol.volumes.map((num) => {
                  const filteredArticles = filterArticles(
                    num.articles,
                    vol.number,
                    num.number
                  );

                  if (filteredArticles.length === 0) return null; // hide empty numbers

                  return (
                    <div key={num.number}>
                      <h4 className="text-xl font-bold mb-2">Número {num.number}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredArticles.map((article, idx) => (
                          <ArticleCard
                            key={idx}
                            img={article.img}
                            title={article.title}
                            author={article.author}
                            date={article.date}
                            link={article.link}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
