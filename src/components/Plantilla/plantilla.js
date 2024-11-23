
import React from "react";
import BarraNavegacion from "./barraNavegacion";
import "./plantilla.css"

const Plantilla = ({ children }) => {
  return (
    <div className="planti">
        {/* Barra de navegación */}
        <BarraNavegacion />
         {/* aqui va a ir como va a ser la plntilla */}
      <div className="contenidoPrincipal">

        {children} {/* Contenido específico de cada página */}
      </div>
    </div>
  );
};

export default Plantilla;
