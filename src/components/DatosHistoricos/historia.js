import React from "react";
import TabularConsumoCSV from "../logicaCSV/tabularConsumoCSV.js";
import TabularProduccionCSV from "../logicaCSV/tabularProduccionCSV.js"; // Importación correcta
import CalculadoraRenovable from "../logicaCSV/filtroCalculadora.js";
import Plantilla from "../Plantilla/plantilla";
import "./historia.css";

const DatosHistoricos = () => {
  return (
    <Plantilla>
      <h1>Bienvenido a la Página de la Calculadora</h1>
      <p>Este es el contenido único de la página Calculadora.</p>
      <h2>CONSUMO DE ENERGIAS RENOVABLES</h2>
      <TabularConsumoCSV />

      <h2>PRODUCCION DE ENERGIAS RENOVABLES</h2>
      <TabularProduccionCSV /> {/* Aquí usamos el componente correcto */}
      <CalculadoraRenovable/>
    </Plantilla>
  );
};

export default DatosHistoricos;

