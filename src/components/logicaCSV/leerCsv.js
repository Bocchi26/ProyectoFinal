async function cargarCSV() {
    try {
        const respuestas = await fetch("./Libro1.csv"); // Cargar el archivo CSV
        const texto = await respuestas.text(); // Leer el contenido como texto

        const lineas = texto.split("\n").map(linea => linea.trim()); // Dividir el contenido por líneas y limpiar espacios
        const encabezados = lineas[0].split(","); // Obtener los encabezados (primera línea)
        const cuerpo = lineas.slice(1); // Obtener las filas de datos

        const tbody = document.querySelector("#tablaUsuarios tbody");

        // Recorrer cada línea de datos
        cuerpo.forEach((linea) => {
            if (linea.trim() === "") return; // Ignorar líneas vacías
            const columnas = linea.split(","); // Dividir las columnas por coma
            // Verificar que la línea tenga el número correcto de columnas
            if (columnas.length === encabezados.length) {
                const fila = document.createElement("tr");

                // Crear celdas para cada columna
                columnas.forEach((dato) => {
                    const celda = document.createElement("td");
                    celda.textContent = dato.trim();
                    fila.appendChild(celda);
                });

                tbody.appendChild(fila); // Añadir la fila al cuerpo de la tabla
            }
        });
    } catch (error) {
        console.error("Error al cargar el archivo CSV: ", error);
    }
}

// Llamar a la función para cargar el CSV
cargarCSV();
