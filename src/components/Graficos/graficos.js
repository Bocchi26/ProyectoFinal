import React from "react";
import Plantilla from "../Plantilla/plantilla";
import GraficoTortaCSV from "./Graficotorta";
import GraficoBarrasCSV from "./graficoBarra";
import GraficoLineasCSV from "./graficoLineas";
import GraficoAreaComparativo from "./graficoArea";
import "./graficos.css"

const Graficos = () => {
  return (
    <Plantilla>
    <h1>Bienvenido a la Página de todas las tablas</h1>
    <p>Este es el contenido único de la página tablas.</p>
    
    {/* Contenedor para gráficos torta y barras */}
    <div className="graficos-horizontal">
      <GraficoTortaCSV />
      <GraficoBarrasCSV />
    </div>

    {/* Otras gráficas */}
    <GraficoLineasCSV />
    <GraficoAreaComparativo />
  </Plantilla>
  );
};
export default Graficos;
