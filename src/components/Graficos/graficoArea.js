import React, { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend,PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import Papa from "papaparse";
import "./graficoArea.css"

const RenewableEnergyChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Cargar y procesar datos
      const [consumptionData, productionData] = await Promise.all([
        fetchCSV("/archivosCSV/02 modern-renewable-energy-consumption.csv"),
        fetchCSV("/archivosCSV/03 modern-renewable-prod.csv"),
      ]);

      // Filtrar y procesar datos
      const processedData = processData(consumptionData, productionData);
      setData(processedData);
    };

    fetchData();
  }, []);

  const fetchCSV = (filePath) => {
    return new Promise((resolve, reject) => {
      Papa.parse(filePath, {
        download: true,
        header: true,
        complete: (results) => resolve(results.data),
        error: (error) => reject(error),
      });
    });
  };

  const processData = (consumptionData, productionData) => {
    const years = Array.from({ length: 2021 - 1965 + 1 }, (_, i) => 1965 + i);

    return years.map((year) => {
      const consumptionYear = consumptionData.find((item) => item.Entity === "Colombia" && Number(item.Year) === year);
      const productionYear = productionData.find((item) => item.Entity === "Colombia" && Number(item.Year) === year);

      // Sumar energías renovables para consumo
      const renewableEnergyConsumption = consumptionYear
        ? parseFloat(consumptionYear["Geo Biomass Other - TWh"] || 0) +
          parseFloat(consumptionYear["Solar Generation - TWh"] || 0) +
          parseFloat(consumptionYear["Wind Generation - TWh"] || 0) +
          parseFloat(consumptionYear["Hydro Generation - TWh"] || 0)
        : 0;

      // Sumar energías renovables para producción
      const renewableEnergyProduction = productionYear
        ? parseFloat(productionYear["Electricity from wind (TWh)"] || 0) +
          parseFloat(productionYear["Electricity from hydro (TWh)"] || 0) +
          parseFloat(productionYear["Electricity from solar (TWh)"] || 0) +
          parseFloat(productionYear["Other renewables including bioenergy (TWh)"] || 0)
        : 0;

      // Depuración: imprimir datos sumados
      console.log(`Año: ${year}, Consumo Total: ${renewableEnergyConsumption}, Producción Total: ${renewableEnergyProduction}`);

      return {
        year,
        renewableEnergyConsumption,
        renewableEnergyProduction,
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

export default RenewableEnergyChart;
