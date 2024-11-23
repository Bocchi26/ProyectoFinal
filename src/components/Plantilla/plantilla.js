
import React from "react";
import { Link } from "react-router-dom";

const Plantilla = ({ children }) => {
  return (
    <div style={{ backgroundColor: "#f0f0f0", minHeight: "100vh" }}>
      <nav>
        {/* Barra de navegación */}
        <ul>
        <li><Link to="/">Home</Link></li>
          <li><Link to="/calculadora">Calculadora</Link></li>
          <li><Link to="/graficos">Gráficos</Link></li>
        </ul>
      </nav>
      <main>
        {/* Contenido específico de cada página */}
        {children}
      </main>
    </div>
  );
};

export default Plantilla;
