// src/components/home/Home.js
import React from "react";
import Plantilla from "../Plantilla/plantilla";

const Home = () => {
  return (
    <Plantilla>
      <h1>Bienvenido a la Página de Inicio</h1>
      <p>Este es el contenido único de la página Home.</p>
      <article className="recuadro">
        <div>
          <h2>Dentro de este recuadro lo que queremos es dar amor </h2>
        </div>
      </article>
    </Plantilla>
  );
};

export default Home;
