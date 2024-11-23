
import React from "react";

const Plantilla = ({ children }) => {
  return (
    <div style={{ backgroundColor: "#f0f0f0", minHeight: "100vh" }}>
      <nav>
        {/* Barra de navegación */}
        <ul>
          <li><a href="../Home/inicio">Home</a></li>
          <li><a href="../Calculadora/">Calculadora</a></li>
          <li><a href="/graficos">Gráficos</a></li>
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
