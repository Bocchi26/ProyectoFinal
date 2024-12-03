import React, { useEffect, useState, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './graficoLineas.css';  // Archivo CSS importado

const GraficoLineasCSV = () => {
  const [datos, setDatos] = useState([]); // Estado para almacenar los datos procesados del CSV

  // Cargar el archivo CSV al montar el componente
  useEffect(() => {
    const cargarCSV = async () => {
      try {
        const respuesta = await fetch("/archivosCSV/02 modern-renewable-energy-consumption.csv");
        const texto = await respuesta.text();

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

  // Filtrar los datos para obtener solo los de Colombia
  const datosFiltrados = useMemo(() => {
    return datos.filter((dato) => 
      dato.Entity.trim().toLowerCase() === "colombia"
    );
  }, [datos]); // Recalcular solo cuando cambien los `datos`

  // Preparar los datos para el gráfico
  const datosParaGrafico = useMemo(() => {
    return datosFiltrados.map((dato) => ({
      year: dato.Year,
      "Bioenergia y otras (TWh)": parseFloat(dato["Geo Biomass Other - TWh"]) || 0,
      "Energia Solar (TWh)": parseFloat(dato["Solar Generation - TWh"]) || 0,
      "Energia Eólica (TWh)": parseFloat(dato["Wind Generation - TWh"]) || 0,
      "Energia hidráulica (TWh)": parseFloat(dato["Hydro Generation - TWh"]) || 0,
    }));
  }, [datosFiltrados]);

  return (
    <article id="grafico-container-lineas">
      <h1>Producción de Energía Renovable en Colombia</h1>
      {datosFiltrados.length === 0 ? (
        <p>No se encontraron datos para Colombia.</p>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <LineChart 
            data={datosParaGrafico}
            margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Bioenergia y otras (TWh)" stroke="#90ee90" />
            <Line type="monotone" dataKey="Energia Solar (TWh)" stroke="#FFD700" />
            <Line type="monotone" dataKey="Energia Eólica (TWh)" stroke="#ff7300" />
            <Line type="monotone" dataKey="Energia hidráulica (TWh)" stroke="#90ee90" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </article>
  );
};

export default GraficoLineasCSV;
