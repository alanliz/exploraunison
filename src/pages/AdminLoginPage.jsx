// src/pages/AdminLoginPage.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLoginPage({ onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // En un proyecto real, esto sería una llamada a la API.
    // Aquí, solo comprobamos una contraseña hardcodeada.
    if (password === "admin123") {
      onLogin(); // Llama a la función para actualizar el estado de autenticación
      navigate("/admin"); // Redirige al panel de admin
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Acceso de Administrador</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            className={`w-full px-3 py-2 border rounded-lg ${error ? 'border-red-500' : 'border-gray-300'}`}
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">Contraseña incorrecta.</p>}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg font-bold hover:bg-blue-600">
          Entrar
        </button>
      </form>
    </div>
  );
}