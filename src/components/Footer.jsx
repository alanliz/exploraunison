import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/logo_white_nobg.png";

// Pequeños componentes para los íconos de redes sociales
const SocialIcon = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
    {children}
  </a>
);

const FacebookIcon = () => (
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z" /></svg>
);

const TwitterIcon = () => (
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.298 1.634 4.218 3.803 4.659-.447.123-1.01.157-1.464.057.609 1.953 2.38 3.372 4.482 3.409-1.625 1.274-3.672 2.03-5.894 2.03-.38 0-.755-.022-1.124-.067 2.099 1.348 4.608 2.138 7.32 2.138 8.65 0 13.525-7.398 13.25-14.022.91-.657 1.7-1.474 2.323-2.41z" /></svg>
);


export default function Footer() {
  return (
    <footer className="bg-slate-800 text-slate-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Columna 1: Logo y descripción */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <img src={logo} alt="Logo Explora Unison" className="h-12 mr-3"/>
              <span className="text-white font-bold text-2xl">Revista Explora Unison</span>
            </div>
            <p className="text-slate-400 max-w-md">
              Revista digital de divulgación científica de la Facultad de Ingeniería de la Universidad de Sonora.
            </p>
          </div>
          
          {/* Columna 2: Navegación */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Navegación</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-white transition-colors">Inicio</Link></li>
              <li><Link to="/articles" className="hover:text-white transition-colors">Artículos</Link></li>
              <li><Link to="/videos" className="hover:text-white transition-colors">Videos</Link></li>
              <li><Link to="/noticias" className="hover:text-white transition-colors">Noticias</Link></li>
              <li><a href="https://www.unison.mx/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Sitio Unison</a></li>
            </ul>
          </div>
          
          {/* Columna 3: Contacto y Redes */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contacto</h3>
            <address className="not-italic space-y-2 text-slate-400">
              <p>Blvd. Luis Encinas J, Hermosillo, Son.</p>
              <p>Email: <a href="mailto:contacto@explora.unison.mx" className="hover:text-white transition-colors">contacto@explora.unison.mx</a></p>
            </address>
            <div className="flex space-x-4 mt-6">
              <SocialIcon href="#"><FacebookIcon /></SocialIcon>
              <SocialIcon href="#"><TwitterIcon /></SocialIcon>
            </div>
          </div>
        </div>
      </div>
      
      {/* Barra inferior de Copyright */}
      <div className="bg-slate-900 py-4">
        <div className="container mx-auto px-6 text-center text-slate-500">
          <p>&copy; {new Date().getFullYear()} Revista Explora Unison. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
