import React from "react";
import TabularConsumoCSV from "../logicaCSV/tabularConsumoCSV.js";
import TabularProduccionCSV from "../logicaCSV/tabularProduccionCSV.js"; // Importación correcta
import CalculadoraRenovable from "../logicaCSV/filtroCalculadora.js";
import Plantilla from "../Plantilla/plantilla";
import "./historia.css";

const DatosHistoricos = () => {
  return (
    <Plantilla>
      <h1 id="titulo1">Datos Historicos</h1>  
      <br></br>
      <br></br>
      <h2 id="subTitulo1">CONSUMO DE ENERGIAS RENOVABLES</h2>
      <TabularConsumoCSV />
      <br></br>
      <br></br>

      <h2 id="subTitulo2">PRODUCCION DE ENERGIAS RENOVABLES</h2>
      <TabularProduccionCSV /> {/* Aquí usamos el componente correcto */}
      <br></br>
      <br></br>
      <CalculadoraRenovable/>
    </Plantilla>
  );
};

export default DatosHistoricos;

