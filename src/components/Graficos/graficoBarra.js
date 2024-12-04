import React, { useEffect, useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './graficoBarras.css';  // Archivo CSS importado

const GraficoBarrasCSV = () => {
  const [datos, setDatos] = useState([]); // Estado para almacenar los datos procesados del CSV

  // Cargar el archivo CSV al montar el componente
  useEffect(() => {
    const cargarCSV = async () => {
      try {
        const respuesta = await fetch("/archivosCSV/03 modern-renewable-prod.csv");
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

  // Filtrar los datos para obtener solo los de Colombia en 2021
  const datosFiltrados = useMemo(() => {
    return datos.filter((dato) => 
      dato.Entity.trim().toLowerCase() === "colombia" && dato.Year.trim() === "2021"
    );
  }, [datos]); // Recalcular solo cuando cambien los `datos`

  // Preparar los datos para el gráfico
  const datosParaGrafico = useMemo(() => {
    return datosFiltrados.map((dato) => ({
      entity: dato.Entity,
      year: dato.Year,
      "Energia Eólica (TWh)": parseFloat(dato["Electricity from wind (TWh)"]) || 0,
      "Energia hidráulica (TWh)": parseFloat(dato["Electricity from hydro (TWh)"]) || 0,
      "Energia Solar (TWh)": parseFloat(dato["Electricity from solar (TWh)"]) || 0,
      "Bioenergia y otras (TWh)": parseFloat(dato["Other renewables including bioenergy (TWh)"]) || 0,
    }));
  }, [datosFiltrados]);

  return (
    <article className="grafico-container">
      <h1>Produccion de energia renovable<br></br>Colombia-2021</h1>
      {datosFiltrados.length === 0 ? (
        <p>No se encontraron datos para Colombia en 2021.</p>
      ) : (
      
        <ResponsiveContainer width="100%" height={472}>
          <BarChart 
            data={datosParaGrafico}
            barCategoryGap="20%" // Separar las barras
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="entity" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Energia Eólica (TWh)" fill="#d3d3d3" />
            <Bar dataKey="Energia hidráulica (TWh)" fill="#4682b4" />
            <Bar dataKey="Energia Solar (TWh)" fill="#FFD700"/>
            <Bar dataKey="Bioenergia y otras (TWh)" fill="#90ee90" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </article>
  );
};

export default GraficoBarrasCSV;
