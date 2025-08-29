import { useState } from "react";
import AddContentModal from "./AddContentModal";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function AddContentDropdown({ addArticle, addVideo, addNews }) {
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  const handleSelect = (type) => {
    setModalType(type);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Dropdown Button */}
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex justify-center items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        <PlusIcon className="w-5 h-5" />
        Agregar
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute mt-2 w-44 bg-white shadow-lg rounded border">
          <button
            onClick={() => handleSelect("Artículo")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Artículo
          </button>
          <button
            onClick={() => handleSelect("Video")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Video
          </button>
          <button
            onClick={() => handleSelect("Noticia")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Noticia
          </button>
        </div>
      )}

      {/* Modal Popup */}
      {modalType && (
        <AddContentModal
          type={modalType}
          onClose={() => setModalType(null)}
          addArticle={addArticle}
          addVideo={addVideo}
          addNews={addNews}
        />
      )}
    </div>
  );
}
