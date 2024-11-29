import React from "react";
import TabularCSV from "../logicaCSV/tablasCSV.js"
import Plantilla from "../Plantilla/plantilla";
import "./historia.css"

const DatosHistoricos = () => {

  return (
    <Plantilla>
      <h1>Bienvenido a la Página de la Calculadora</h1>
      <p>Este es el contenido único de la página Calculadora.</p>
      
      <TabularCSV />
    </Plantilla>
  );
};

export default DatosHistoricos;

