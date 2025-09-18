import { useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import logo from "../assets/logo_white_nobg.png";

function SearchInput({ search, setSearch }) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Buscar artículos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="rounded-full py-2 pl-4 pr-10 text-gray-900 w-56 bg-blue-50 placeholder-gray-500 transition-all duration-300 focus:w-64 focus:bg-white"
      />
      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute top-1/2 right-3 -translate-y-1/2" />
    </div>
  );
}

export default function Header({ search, setSearch }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (search && location.pathname !== "/articles") {
      navigate("/articles");
    }
    if (location.pathname !== "/articles" && search) {
      setSearch("");
    }
  }, [search, location.pathname, navigate, setSearch]);

  // --- CAMBIO: Estilos de navegación actualizados para un look más sutil ---
  const navLinkClass = "py-2 text-sm font-semibold transition-colors border-b-2";
  const activeClass = "text-white border-white"; // Un simple subrayado blanco
  const inactiveClass = "text-blue-200 border-transparent hover:text-white"; // Transparente para no moverse

  return (
    <header className="bg-[#24398A] shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Lado Izquierdo: Logo y Título */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-4">
              {/* --- CAMBIO: Dimensiones del logo corregidas --- */}
              <img src={logo} alt="Logo" className="h-12 w-auto" />
              
              {/* --- CAMBIO: Título completo restaurado --- */}
              <span className="text-white text-2xl font-bold tracking-tight hidden sm:block">
                Revista Explora Unison: Ingeniería y Futuro
              </span>
            </Link>
          </div>

          {/* Lado Derecho: Navegación y Búsqueda */}
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex items-center space-x-4">
              <NavLink 
                to="/" 
                className={({ isActive }) => `${navLinkClass} ${isActive ? activeClass : inactiveClass}`}
                end
              >
                Inicio
              </NavLink>
              <NavLink 
                to="/articles" 
                className={({ isActive }) => `${navLinkClass} ${isActive ? activeClass : inactiveClass}`}
              >
                Artículos
              </NavLink>
              <NavLink 
                to="/videos" 
                className={({ isActive }) => `${navLinkClass} ${isActive ? activeClass : inactiveClass}`}
              >
                Videos
              </NavLink>
              <NavLink 
                to="/noticias" 
                className={({ isActive }) => `${navLinkClass} ${isActive ? activeClass : inactiveClass}`}
              >
                Noticias
              </NavLink>
            </nav>
            <SearchInput search={search} setSearch={setSearch} />
          </div>
        </div>
      </div>
    </header>
  );
}