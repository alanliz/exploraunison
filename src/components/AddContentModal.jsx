import { useState, useRef, useEffect } from "react";

export default function AddContentModal({ type, onClose, addArticle, addVideo, addNews }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [volume, setVolume] = useState("");
  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");
  const [pages, setPages] = useState("");
  const [abstractText, setAbstractText] = useState("");
  const [pdfFile, setPdfFile] = useState(null); // new state for PDF

  const titleRef = useRef(null);
  const authorRef = useRef(null);

  // Auto-expand single-line inputs
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.width = "auto";
      titleRef.current.style.width = titleRef.current.scrollWidth + 20 + "px";
    }
    if (authorRef.current) {
      authorRef.current.style.width = "auto";
      authorRef.current.style.width = authorRef.current.scrollWidth + 20 + "px";
    }
  }, [title, author]);

  const handleSubmit = () => {
    if (type === "Artículo") {
      const newArticle = {
        id: Date.now(),
        title,
        author,
        volume,
        number,
        date,
        pages,
        abstract: abstractText,
        pdf: pdfFile, // include the uploaded PDF
      };
      addArticle(newArticle);
    } else if (type === "Video") {
      addVideo({ id: Date.now(), title, author });
    } else if (type === "Noticia") {
      addNews({ id: Date.now(), title, author });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Slightly transparent overlay */}
      <div className="absolute inset-0 bg-black opacity-30" onClick={onClose}></div>
      <div className="relative bg-white p-6 rounded shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto z-10">
        <h2 className="text-xl font-bold mb-4">Agregar {type}</h2>

        {/* Title & Author line */}
        <div className="flex gap-4 mb-4 flex-wrap">
          <label className="flex-1">
            Título:
            <input
              ref={titleRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 rounded w-full ml-2"
              placeholder="Título del artículo"
            />
          </label>

          <label className="flex-1">
            Autor:
            <input
              ref={authorRef}
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border p-2 rounded w-full"
              placeholder="Autor"
            />
          </label>
        </div>

        {/* Volume, Number, Date, Pages line */}
        {type === "Artículo" && (
          <div className="flex gap-4 mb-4 flex-wrap">
            <label className="flex-1">
              Volumen:
              <input
                type="number"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className="border p-2 rounded w-full"
              />
            </label>
            <label className="flex-1">
              Número:
              <input
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="border p-2 rounded w-full"
              />
            </label>
            <label className="flex-1">
              Fecha de publicación:
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border p-2 rounded w-full"
              />
            </label>
            <label className="flex-1">
              Número de páginas:
              <input
                type="number"
                value={pages}
                onChange={(e) => setPages(e.target.value)}
                className="border p-2 rounded w-full"
              />
            </label>
          </div>
        )}

        {/* Abstract */}
        {type === "Artículo" && (
          <>
            <label className="block mb-4">
              Abstract:
              <textarea
                value={abstractText}
                onChange={(e) => setAbstractText(e.target.value)}
                className="border p-2 rounded w-full"
                rows={4}
              />
            </label>

            {/* PDF upload */}
            <label className="block mb-4">
              Subir PDF:
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setPdfFile(e.target.files[0])}
                className="border p-1 rounded w-50 ml-2"
              />
            </label>
          </>
        )}

        {/* Fields for Video / Noticia */}
        {type !== "Artículo" && (
          <label className="block mb-4">
            Autor:
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </label>
        )}

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
