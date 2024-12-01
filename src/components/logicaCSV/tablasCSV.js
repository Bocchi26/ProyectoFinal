import React, { useEffect, useState, useMemo } from "react";
import { useTable} from "react-table";
import "./tablasCSV.css"

const TabularCSV = () => {
  const [datos, setDatos] = useState([]); // Estado para almacenar los datos procesados del CSV
  const [filtros, setFiltros] = useState({ entity: "", year: "" }); // Filtros iniciales
  const [filtrosAplicados, setFiltrosAplicados] = useState({ entity: "Colombia", year: "2021" }); // Filtros aplicados
  const [opcionesPais, setOpcionesPais] = useState([]);
  const [opcionesYear, setOpcionesYear] = useState([]);
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
         // Extraer opciones únicas para país y año
         const paisesUnicos = [...new Set(datosProcesados.map((dato) => dato.Entity).filter(Boolean))];
         const añosUnicos = [...new Set(datosProcesados.map((dato) => dato.Year).filter(Boolean))].sort();
 
         setOpcionesPais(paisesUnicos);
         setOpcionesYear(añosUnicos);
      } catch (error) {
        console.error("Error al cargar el archivo CSV: ", error);
      }
    };

    cargarCSV();
  }, []);

  // Filtrar datos solo cuando los filtros sean aplicados
  const datosFiltrados = useMemo(() => {
    return datos.filter((dato) => {
      let entityNormalizado = filtrosAplicados.entity.trim().toLowerCase();
      let yearNormalizado = filtrosAplicados.year.trim();
      let coincideEntity = !entityNormalizado || dato.Entity?.trim().toLowerCase() === entityNormalizado;
      let coincideYear = !yearNormalizado || dato.Year?.trim() === yearNormalizado;
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
  let mostrarMensaje = !filtrosAplicados.entity.trim() && !filtrosAplicados.year.trim();

  return (
    <article>
      <div>
      <label>
        País:
        <select
          value={filtros.entity}
          onChange={(e) => setFiltros({ ...filtros, entity: e.target.value })}
        >
          <option value="">Seleccione un país</option>
          {opcionesPais.map((pais, index) => (
            <option key={index} value={pais}>
              {pais}
            </option>
          ))}
        </select>
      </label>
      <label>
        Año:
        <select
          value={filtros.year}
          onChange={(e) => setFiltros({ ...filtros, year: e.target.value })}
        >
          <option value="">Seleccione un año</option>
          {opcionesYear.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
      </label>
      <button onClick={() => setFiltrosAplicados({ ...filtros })}>Filtrar</button>
      </div>

      {mostrarMensaje || datosFiltrados.length === 0 ? (
        <p className="mensajes">No se encontraron datos</p>
      ) : (
        <div>
        <table {...getTableProps()}id="tabalPincipal" >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}id="cabezeraTabla">
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
                    <td {...cell.getCellProps()} id="cuerpoTabla">
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })
          ) : (
            // Mostrar mensaje si no hay datos
            <tr>
              <td colSpan={columnas.length} className="mesajes">
                No se encontraron resultados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
      )}
    </article>
  );
};

export default TabularCSV;
