import React from "react";
import TabularConsumoCSV from "../logicaCSV/tabularConsumoCSV.js";
import TabularProduccionCSV from "../logicaCSV/tabularProduccionCSV.js"; // Importación correcta
import CalculadoraRenovable from "../logicaCSV/filtroCalculadora.js";
import Plantilla from "../Plantilla/plantilla";
import "./historia.css";

const DatosHistoricos = () => {
  return (
    <Plantilla>
      <h1 id="titulo1">ACA PODRAS VER EL CONSUMO, LA PRODUCCION Y LA CALCULADORA DE ENERGIA RENOVABLE</h1>  
      <h2 id="subTitulo1">CONSUMO DE ENERGIAS RENOVABLES</h2>
      <TabularConsumoCSV />

      <h2 id="subTitulo2">PRODUCCION DE ENERGIAS RENOVABLES</h2>
      <TabularProduccionCSV /> {/* Aquí usamos el componente correcto */}
      <CalculadoraRenovable/>
    </Plantilla>
  );
};

export default DatosHistoricos;

