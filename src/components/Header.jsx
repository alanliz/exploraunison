import { Link } from "react-router-dom";
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import logo from "../assets/logo_white_nobg.png";


function SearchInput() {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Buscar..."
        className="rounded-full py-2 px-4 text-gray-900 w-full bg-white"
      />
      <button className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-4 text-gray-900">
        <MagnifyingGlassIcon className="h-5 w-5" />
      </button>
    </div>
  );
}

function Header() {
  return (
    <header className="bg-[#24398A] text-white p-4">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center">
          <img          
            src={logo}
            alt="Logo de la revista con un búho e ingenierías"
            className="mr-3"
            width="50"
            height="50"
          />
          <h1 className="text-2xl font-bold">
            <Link to="/">Revista Explora Unison: Ingeniería y Futuro</Link>
          </h1>
        </div>
        <nav className="flex items-center space-x-4">
          <ul className="flex space-x-4">
            <li>
              <Link className="hover:underline" to="/">Inicio</Link>
            </li>
            <li>
              <Link className="hover:underline" to="/articles">Artículos</Link>
            </li>
            <li>
              <a className="hover:underline" href="#">Quiénes Somos</a>
            </li>
          </ul>
          <div className="w-50">
            <SearchInput />
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
