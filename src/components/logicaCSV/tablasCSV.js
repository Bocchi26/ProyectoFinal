

import React, { useEffect, useState, useMemo } from "react";
import { useTable} from "react-table";
import "./tablasCSV.css"

const TabularCSV = () => {
  const [datos, setDatos] = useState([]); // Estado para almacenar los datos procesados del CSV
  const [filtros, setFiltros] = useState({ entity: "", year: "" }); // Filtros iniciales
  const [filtrosAplicados, setFiltrosAplicados] = useState({ entity: "Colombia", year: "2021" }); // Filtros aplicados

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
      }
    };

    cargarCSV();
  }, []);

  // Filtrar datos solo cuando los filtros sean aplicados
  const datosFiltrados = useMemo(() => {
    return datos.filter((dato) => {
      const entityNormalizado = filtrosAplicados.entity.trim().toLowerCase();
      const yearNormalizado = filtrosAplicados.year.trim();
      const coincideEntity = !entityNormalizado || dato.Entity?.trim().toLowerCase() === entityNormalizado;
      const coincideYear = !yearNormalizado || dato.Year?.trim() === yearNormalizado;
      return coincideEntity && coincideYear;
    });
  }, [datos, filtrosAplicados]); // Recalcular solo cuando cambien `datos` o `filtrosAplicados`

  // Definición de columnas para la tabla
  const columnas = useMemo(
    () => [
      { Header: "Pais", accessor: "Entity" },
      { Header: "Code", accessor: "Code" },
      { Header: "Year", accessor: "Year" },
      { Header: "Geo Biomass Other - TWh", accessor: "Geo Biomass Other - TWh" },
      { Header: "Solar Generation - TWh", accessor: "Solar Generation - TWh" },
      { Header: "Wind Generation - TWh", accessor: "Wind Generation - TWh" },
      { Header: "Hydro Generation - TWh", accessor: "Hydro Generation - TWh" },
    ],
    []
  );

  // Preparar la tabla con react-table usando los datos filtrados
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns: columnas,
    data: datosFiltrados,
  });

  return (
    <article>
      <h1>Datos Históricos</h1>

      
      <div style={{ marginBottom: "20px" }}>
        <label>
          <strong>Filtrar por País: </strong>
          <input
            type="text"
            value={filtros.entity} // Enlazar el valor al estado
            onChange={(e) =>
              setFiltros({ ...filtros, entity: e.target.value.toLowerCase() }) // Normalizar el filtro de país
            }
            placeholder="Escribe un país (ej. Colombia)"
          />
        </label>
        <label style={{ marginLeft: "10px" }}>
          <strong>Filtrar por Año: </strong>
          <input
            type="text"
            value={filtros.year} // Enlazar el valor al estado
            onChange={(e) => setFiltros({ ...filtros, year: e.target.value.trim() })} // Normalizar el filtro de año
            placeholder="Escribe un año (ej. 2021)"
          />
        </label>
        <button
          onClick={() => setFiltrosAplicados({ ...filtros })} // Aplicar los filtros al hacer clic
          style={{ marginLeft: "10px", padding: "5px 10px", cursor: "pointer" }}
        >
          Filtrar
        </button>
      </div>

     
      <table {...getTableProps()} border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} style={{ padding: "8px", background: "#f0f0f0" }}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.length > 0 ? (
            rows.map((row) => {
              prepareRow(row); // Preparar la fila antes de renderizarla
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} style={{ padding: "8px", textAlign: "center" }}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })
          ) : (
            // Mostrar mensaje si no hay datos
            <tr>
              <td colSpan={columnas.length} style={{ textAlign: "center", padding: "8px" }}>
                No se encontraron resultados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </article>
);
};

export default TabularCSV;
