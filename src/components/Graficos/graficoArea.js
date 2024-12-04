import React, { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend,PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import Papa from "papaparse";
import "./graficoArea.css"

const GraficoAreaCSV = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Cargar y procesar datos
      const [consumoDatos, produccionDatos] = await Promise.all([
        fetchCSV("/archivosCSV/02 modern-renewable-energy-consumption.csv"),
        fetchCSV("/archivosCSV/03 modern-renewable-prod.csv"),
      ]);

      // Filtrar y procesar datos
      const datosProcesados = datosProcesados(consumoDatos, produccionDatos);
      setData(datosProcesados);
    };

    fetchData();
  }, []);

  const fetchCSV = (rutaArchivo) => {
    return new Promise((resolve, reject) => {
      Papa.parse(rutaArchivo, {
        download: true,
        header: true,
        complete: (results) => resolve(results.data),
        error: (error) => reject(error),
      });
    });
  };

  const datosProcesados = (datosConsumo, datosProduccion) => {
    const years = Array.from({ length: 2021 - 1965 + 1 }, (_, i) => 1965 + i);

    return years.map((year) => {
      const consumoAño = datosConsumo.find((item) => item.Entity === "Colombia" && Number(item.Year) === year);
      const producidoAño = datosProduccion.find((item) => item.Entity === "Colombia" && Number(item.Year) === year);

      // Sumar energías renovables para consumo
      const energiaRenovableConsumo = consumoAño
        ? parseFloat(consumoAño["Geo Biomass Other - TWh"] || 0) +
          parseFloat(consumoAño["Solar Generation - TWh"] || 0) +
          parseFloat(consumoAño["Wind Generation - TWh"] || 0) +
          parseFloat(consumoAño["Hydro Generation - TWh"] || 0)
        : 0;

      // Sumar energías renovables para producción
      const energiaRenovableProduccion = producidoAño
        ? parseFloat(producidoAño["Electricity from wind (TWh)"] || 0) +
          parseFloat(producidoAño["Electricity from hydro (TWh)"] || 0) +
          parseFloat(producidoAño["Electricity from solar (TWh)"] || 0) +
          parseFloat(producidoAño["Other renewables including bioenergy (TWh)"] || 0)
        : 0;

      // Depuración: imprimir datos sumados
      console.log(`Año: ${year}, Consumo Total: ${energiaRenovableConsumo}, Producción Total: ${energiaRenovableProduccion}`);

      return {
        year,
        renewableEnergyConsumption: energiaRenovableConsumo,
        renewableEnergyProduction: energiaRenovableProduccion,
      };
    });
  };

  return (
        <article id="grafico-area">
      <h1>Consumo vs. Producción de Energía Renovable en Colombia</h1>
      {data.length === 0 ? (
        <p>No se encontraron datos para Colombia.</p>
      ) : (
        <ResponsiveContainer width="100%" height={400} className="ResponsiveContainer-area">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" scale="point" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="renewableEnergyConsumption"
              name="Consumo Renovable (TWh)"
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Area
              type="monotone"
              dataKey="renewableEnergyProduction"
              name="Producción Renovable (TWh)"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </article>

  );
};

export default GraficoAreaCSV;
