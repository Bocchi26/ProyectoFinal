import React, { useState, useEffect, useMemo } from "react";

const CalculadoraRenovable = () => {
  const [datos, setDatos] = useState([]); // Datos del CSV
  const [consumoUsuario, setConsumoUsuario] = useState(""); // Consumo ingresado por el usuario (en kWh)
  const [resultados, setResultados] = useState(null); // Resultados de los cálculos
const [error, setError] = useState(null);

  // Cargar el archivo CSV al montar el componente
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
        setError("Error al cargar el archivo CSV");
    }
    };

    cargarCSV();
  }, []);

  // Filtrar datos específicos de Colombia en 2021
  const datosFiltrados = useMemo(() => {
    return datos.filter(
      (dato) =>
        dato.Entity?.trim().toLowerCase() === "colombia" &&
        dato.Year?.trim() === "2021"
    );
  }, [datos]);

  // Calcular porcentajes por tipo de energía renovable
  const calcularPorcentajes = () => {
    if (!consumoUsuario || isNaN(consumoUsuario)) {
      setError("Por favor ingresa un consumo eléctrico válido.");
      return;
    }

    const totalUsuarioTWh = (parseFloat(consumoUsuario) * Math.pow(10, -9)) / 12; // Conversión corregida a TWh

    const energias = {
      "Geotérmica/Biomasa": "Geo Biomass Other - TWh",
      Solar: "Solar Generation - TWh",
      Eólica: "Wind Generation - TWh",
      Hidroeléctrica: "Hydro Generation - TWh",
    };

    const resultadosCalculo = {};

    Object.entries(energias).forEach(([nombre, columna]) => {
      const totalEnergia = datosFiltrados.reduce((acc, dato) => {
        const valor = parseFloat(dato[columna]); // Acceder al valor con el nombre exacto de la columna
        return acc + (isNaN(valor) ? 0 : valor);
      }, 0);

      resultadosCalculo[nombre] = {
        totalTWh: totalEnergia,
        porcentaje: totalEnergia
          ? ((totalUsuarioTWh * 100) / totalEnergia).toFixed(2)
          : 0,
      };
    });

    setResultados({
      totalUsuarioTWh,
      resultadosCalculo,
      conversionKWhTWh: totalUsuarioTWh.toFixed(10), // Mostrar con más precisión para resaltar la magnitud
    });
    setError(null);
  };

  return (
    <div>
      <h1>Calculadora de Energía Renovable</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label>Consumo eléctrico total (kWh): </label>
        <input
          type="number"
          value={consumoUsuario}
          onChange={(e) => setConsumoUsuario(e.target.value)}
        />
        <button onClick={calcularPorcentajes}>Calcular</button>
      </div>
      {resultados && (
        <div>
          <h2>Resultados:</h2>
          <p>
            <strong>Conversión de kWh a TWh:</strong> {resultados.conversionKWhTWh} TWh
          </p>
          <p>
            <strong>Consumo total en TWh:</strong> {resultados.totalUsuarioTWh.toFixed(10)} TWh
          </p>
          <ul>
            {Object.entries(resultados.resultadosCalculo).map(
              ([energia, datos], index) => (
                <li key={index}>
                  <strong>{energia}:</strong> {datos.totalTWh.toFixed(2)} TWh |{" "}
                  Porcentaje: {datos.porcentaje}% (TWh)
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CalculadoraRenovable;