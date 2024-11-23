
import React from "react";
import BarraNavegacion from "./barraNavegacion";

const Plantilla = ({ children }) => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
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
