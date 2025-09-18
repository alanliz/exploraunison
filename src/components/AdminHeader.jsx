import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo_white_nobg.png';
import { ArrowTopRightOnSquareIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';

export default function AdminHeader({ onLogout }) {
  return (
    <header className="bg-[#24398A] text-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Lado Izquierdo: Logo y Título */}
          <div className="flex items-center space-x-4">
            <img 
              src={logo} 
              alt="Logo Explora Unison" 
              className="h-12 w-auto" // Corregido para mantener la proporción
            />
            <div className="flex items-center gap-x-3">
              <span className="text-white text-2xl font-bold tracking-tight hidden sm:block">
                Revista Explora Unison: Ingeniería y Futuro
              </span>
              <span className="bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded-md">
                Admin
              </span>
            </div>
          </div>

          {/* Lado Derecho: Navegación y Acciones */}
          <nav className="flex items-center space-x-4">
            <Link 
              to="/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-semibold text-blue-100 hover:bg-blue-700 hover:text-white transition-colors"
            >
              <ArrowTopRightOnSquareIcon className="h-5 w-5" />
              Ver Sitio
            </Link>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-semibold bg-red-700 text-white hover:bg-blue-800 transition-colors"
            >
              <ArrowLeftOnRectangleIcon className="h-5 w-5" />
              Cerrar Sesión
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}