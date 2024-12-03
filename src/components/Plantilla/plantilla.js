
import React from "react";
import BarraNavegacion from "./barraNavegacion";
import "./plantilla.css"


const Plantilla = ({ children }) => {
  return (
    <div className="plantilla">
      <header id="Encabezado"> 
        <img src= "https://i.ibb.co/6F1z6ms/Captura-de-pantalla-2024-11-23-184323-removebg-preview.png" alt=" " id="logo"/> 
        <h2 id="texto-encabezado">GeoTech</h2>

        <div className="links">
            <a href="#SubTitulo">¿Qué es?</a>
            <a href="#subTitulo2">Beneficios</a>
            <a href="#titulosecciones">Aplicación</a>
        </div>

      </header>

      <main className="contenidoPrincipal">
      <BarraNavegacion />
        {children} {/* Contenido específico de cada página */}
        
      </main>
      
    </div>
    
    
  );
};

export default Plantilla;
