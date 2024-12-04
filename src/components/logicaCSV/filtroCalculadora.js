import React, { useState, useEffect, useMemo } from "react";
import "./tablasCSV.css";  // Asegúrate de importar tu CSS

const CalculadoraRenovable = () => {
  const [datos, setDatos] = useState([]);
  const [consumoUsuario, setConsumoUsuario] = useState("");
  const [resultados, setResultados] = useState(null);
  const [error, setError] = useState(null);

useEffect(() => {
    const cargarCSV = async () => {
      try {
        const respuestas = await fetch("/archivosCSV/02 modern-renewable-energy-consumption.csv");
        const texto = await respuestas.text();

        const lineas = texto.split("\n").map((linea) => linea.trim());
        const encabezados = lineas[0].split(",");
        const cuerpo = lineas.slice(1);

        const datosProcesados = cuerpo
          .filter((linea) => linea.trim() !== "")
          .map((linea) => {
            const columnas = linea.split(",");
            return encabezados.reduce((obj, encabezado, index) => {
              obj[encabezado] = columnas[index]?.trim();
              return obj;
            }, {});
});

        setDatos(datosProcesados);
      } catch (error) {
        console.error("Error al cargar el archivo CSV: ", error);
        setError("Error al cargar el archivo CSV");
      }
    };

    cargarCSV();
  }, []);

  const datosFiltrados = useMemo(() => {
    return datos.filter(
      (dato) =>
        dato.Entity?.trim().toLowerCase() === "colombia" &&
        dato.Year?.trim() === "2021"
    );
  }, [datos]);

  const calcularPorcentajes = () => {
    if (!consumoUsuario || isNaN(consumoUsuario)) {
      setError("Por favor ingresa un consumo eléctrico válido.");
      return;
    }

    const totalUsuarioTWh = (parseFloat(consumoUsuario) * Math.pow(10, -9)) / 12;

    const energias = {
      "Geotérmica": "Geo Biomass Other - TWh",
      Solar: "Solar Generation - TWh",
      Eólica: "Wind Generation - TWh",
      Hidroeléctrica: "Hydro Generation - TWh",
    };

    const resultadosCalculo = {};

    Object.entries(energias).forEach(([nombre, columna]) => {
      const totalEnergia = datosFiltrados.reduce((acc, dato) => {
        const valor = parseFloat(dato[columna]);
        return acc + (isNaN(valor) ? 0 : valor);
      }, 0);

      resultadosCalculo[nombre] = {
        totalTWh: totalEnergia,
        porcentaje: totalEnergia
          ? ((totalUsuarioTWh * 100) / totalEnergia).toFixed(15)
          : 0,
      };
    });

    setResultados({
      totalUsuarioTWh,
      resultadosCalculo,
      conversionKWhTWh: totalUsuarioTWh.toFixed(10),
    });
    setError(null);
  };

  return (
    <div className="calculadora-container">
      <h2 id="subTitulo3">Calculadora de Energía Renovable</h2>
      <div className="formulario-container">
        <label>Consumo eléctrico total (kWh): </label>
        <input
          type="number"
          value={consumoUsuario}
          onChange={(e) => setConsumoUsuario(e.target.value)}
        />
        <button className="calcular-btn" onClick={calcularPorcentajes}>
          Calcular
        </button>
      </div>
      {resultados && (
        <div className="resultados-container">
          <h2>Resultados:</h2>
          <p>
            <strong>Conversión de kWh a TWh:</strong> {resultados.conversionKWhTWh} TWh
          </p>
          <p>
            <strong>Consumo total en TWh:</strong> {resultados.totalUsuarioTWh.toFixed(10)} TWh
          </p>
          <table className="tabla-resultados">
            <thead>
              <tr>
                <th>Energía Renovable</th>
                <th>Total (TWh)</th>
                <th>Porcentaje (%)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(resultados.resultadosCalculo).map(
                ([energia, datos], index) => (
                  <tr key={index}>
                    <td>{energia}</td>
                    <td>{datos.totalTWh.toFixed(2)}</td>
                    <td>{datos.porcentaje}%</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default CalculadoraRenovable;
