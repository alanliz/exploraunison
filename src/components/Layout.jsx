// src/components/Layout.jsx

import React from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ search, setSearch, content, loading }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
      <Header search={search} setSearch={setSearch} />
      <main className="flex-grow">
        {/* LA LÍNEA CLAVE: 'context' pasa los datos a Home, Articles, etc. */}
        <Outlet context={{ content, loading }} />
      </main>
      <Footer />
    </div>
  );
}