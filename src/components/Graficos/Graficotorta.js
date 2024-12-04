import React, { useEffect, useState, useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import "./Graficotorta.css"

const GraficoTortaCSV = () => {
  const [datos, setDatos] = useState([]); // Estado para almacenar los datos procesados del CSV

  // Colores para las secciones del gráfico
  const colores = ["#90ee90", "#d3d3d3", "#FFD700", "#4682b4"]

  useEffect(() => {
    const cargarCSV = async () => {
      try {
        const respuestas = await fetch("/archivosCSV/02 modern-renewable-energy-consumption.csv");
        const texto = await respuestas.text();

        const lineas = texto.split("\n").map((linea) => linea.trim());
        const encabezados = lineas[0].split(","); // Encabezados como nombres de columnas
        const cuerpo = lineas.slice(1); // Resto del archivo como datos

        const datosProcesados = cuerpo
          .filter((linea) => linea.trim() !== "") // Eliminar líneas vacías
          .map((linea) => {
            const columnas = linea.split(",");
            return encabezados.reduce((obj, encabezado, index) => {
              obj[encabezado] = columnas[index]?.trim(); // Asignar valores a cada encabezado
              return obj;
            }, {});
          });

        setDatos(datosProcesados); // Guardar los datos procesados en el estado
      } catch (error) {
        console.error("Error al cargar el archivo CSV: ", error);
      }
    };

    cargarCSV();
  }, []);

  // Filtrar los datos de Colombia en 2021 directamente
  const datosColombia2021 = useMemo(() => {
    return datos.find(
      (dato) =>
        dato.Entity?.trim().toLowerCase() === "colombia" && dato.Year?.trim() === "2021"
    );
  }, [datos]);

  // Preparar datos para el gráfico de torta
  const datosGrafico = useMemo(() => {
    if (!datosColombia2021) return [];
    return [
      { name: "Bioenergia y otras (TWh)", value: parseFloat(datosColombia2021["Geo Biomass Other - TWh"]) || 0 },
      { name: "Energia Solar (TWh)", value: parseFloat(datosColombia2021["Solar Generation - TWh"]) || 0 },
      { name: "Energia Eólica (TWh)", value: parseFloat(datosColombia2021["Wind Generation - TWh"]) || 0 },
      { name: "Energia hidráulica (TWh)", value: parseFloat(datosColombia2021["Hydro Generation - TWh"]) || 0 },
    ];
  }, [datosColombia2021]);

  return (
    <article id="grafica-torta">
  {datosGrafico.length === 0 ? (
    <p>No se encontraron datos para Colombia en 2021.</p>
  ) : (
    <>
      <h1 className="titulos">Consumo de energia renovable<br></br>Colombia-2021</h1>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={datosGrafico}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius="70%"
            fill="#8884d8"
          >
            {datosGrafico.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colores[index % colores.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      {/* Etiquetas por fuera */}
      <div id="datos">
        {datosGrafico.map((entry, index) => (
          <div key={`label-${index}`} id="valores">
            <div
              className="color-indicador"
              style={{ backgroundColor: colores[index % colores.length] }}
            ></div>
            <span className="dato-texto">
              {entry.name}: <strong>{entry.value.toFixed(2)} TWh</strong>
            </span>
          </div>
        ))}
      </div>
    </>
  )}
</article>

  );
};

export default GraficoTortaCSV;

