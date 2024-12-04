
import React from "react";
import BarraNavegacion from "./barraNavegacion";
import "./plantilla.css"


const Plantilla = ({ children }) => {
  return (
    <div className="plantilla">
      <header id="Encabezado"> 
        <img src= "https://i.ibb.co/6F1z6ms/Captura-de-pantalla-2024-11-23-184323-removebg-preview.png" alt=" " id="logo"/> 
        <h2 id="texto-encabezado">GeoTech</h2>

        

      </header>

      <main className="contenidoPrincipal">
      <BarraNavegacion />
        {children} {/* Contenido específico de cada página */}
        
      </main>
      
    </div>
    
    
  );
};

export default Plantilla;
