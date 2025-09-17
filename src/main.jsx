// src/main.jsx (CORREGIDO)

import React from 'react';
import ReactDOM from 'react-dom/client';
// CAMBIO IMPORTANTE: Importamos AppWrapper en lugar de App
import AppWrapper from './App'; 
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* CAMBIO IMPORTANTE: Usamos AppWrapper aquí */}
    <AppWrapper /> 
  </React.StrictMode>
);