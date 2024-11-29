import React from "react";
import Plantilla from "../Plantilla/plantilla";


const datosHistoricos = () => {
  
  return (
    <Plantilla>
      <h1>Bienvenido a la Página de la Calculadora</h1>
      <p>Este es el contenido único de la página Calculadora.</p>
      <div>
        <h1>Tabla de pruebitaa</h1>
        <table id="tablaUsuarios">
          <thead>
            <tr>
              <th>PAIS</th>
              <th>CODIGO</th>
              <th> AÑO</th>
              <th>GEOTERMICA (TWH)</th>
              <th>ENERGIA SOLAR (TWH)</th>
              <th>ENERGIA EOLICA (TWH)</th>
              <th>ENERGIA HIDRAULICA</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </Plantilla>
  );
};


export default datosHistoricos;

