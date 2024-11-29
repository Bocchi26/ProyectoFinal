import React, { useEffect } from "react";
import Plantilla from "../Plantilla/plantilla";

<<<<<<< HEAD
const Calculadora = () => {
  useEffect(() => {
    const cargarCSV = async () => {
      try {
        const respuestas = await fetch("/archivosCSV/02 modern-renewable-energy-consumption.csv");
        const texto = await respuestas.text();

        const lineas = texto.split("\n").map((linea) => linea.trim());
        const encabezados = lineas[0].split(",");
        const cuerpo = lineas.slice(1);

        const tbody = document.querySelector("#tablaUsuarios tbody");

        cuerpo.forEach((linea) => {
          if (linea.trim() === "") return;
          const columnas = linea.split(",");
          if (columnas.length === encabezados.length) {
            const fila = document.createElement("tr");

            columnas.forEach((dato) => {
              const celda = document.createElement("td");
              celda.textContent = dato.trim();
              fila.appendChild(celda);
            });

            tbody.appendChild(fila);
          }
        });
      } catch (error) {
        console.error("Error al cargar el archivo CSV: ", error);
      }
    };

    cargarCSV();
  }, []); // Se ejecuta solo una vez cuando se monta el componente
  console.log("Versión local y remota");

=======
const datosHistoricos = () => {
  console.log("Versión local y remota");

>>>>>>> e46594679211d5f8389ebfb63b75ad96b431a4f3
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

<<<<<<< HEAD
export default Calculadora;
=======
export default datosHistoricos;
>>>>>>> e46594679211d5f8389ebfb63b75ad96b431a4f3
