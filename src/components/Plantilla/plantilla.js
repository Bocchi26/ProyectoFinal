
import React from "react";
import BarraNavegacion from "./barraNavegacion";
import "./plantilla.css"

const Plantilla = ({ children }) => {
  return (
    <div className="plantilla">
      <header>

      </header>
        {/* Barra de navegación */}
        <BarraNavegacion />
         {/* aqui va a ir como va a ser la plntilla */}

      <main className="contenidoPrincipal">
        {children} {/* Contenido específico de cada página */}
      </main>
      <footer>© 2024 Energías Renovables</footer>
    </div>
  );
};

export default Plantilla;
