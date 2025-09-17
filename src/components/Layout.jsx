import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

// Este componente recibe el estado de búsqueda para pasárselo al Header
export default function Layout({ search, setSearch }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
      <Header search={search} setSearch={setSearch} />
      
      <main className="flex-grow">
        {/* Outlet renderizará el componente de la ruta actual (Home, Articles, etc.) */}
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
}