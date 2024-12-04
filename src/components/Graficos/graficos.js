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
      <br></br><br></br><br></br><br></br><br></br>

    <h1>Bienvenido a las Graficas</h1>
  
    
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
