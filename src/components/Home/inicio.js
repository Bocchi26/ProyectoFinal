// src/components/home/Home.js
import React from "react";
import Plantilla from "../Plantilla/plantilla";
import "./inicio.css"

const Home = () => {
  return (
    <Plantilla>
      <h1 id="Titulo">Bienvenido a la Página de Inicio</h1>
      <p>Este es el contenido único de la página Home.</p>

      <div className="Secciones">
          <section className="Seccion1">
            <h2>Solar:</h2>
            <p>afasldjfsalfjasldfjlasdjflasjdlfjasdlfkjasldfkjasldkfjalsdfjalsdfjalsdfjalsdkfjasldfjas</p>
          </section>

          <section className="Seccion2">
            <h2>Eólica:</h2>
            <p>afasldjfsalfjasldfjlasdjflasjdlfjasdlfkjasldfkjasldkfjalsdfjalsdfjalsdfjalsdkfjasldfjas</p>
          </section>
      </div>

      <div className="Secciones2">
          <section className="Seccion3">
            <h2>Hidroeléctrica:</h2>
            <p>afasldjfsalfjasldfjlasdjflasjdlfjasdlfkjasldfkjasldkfjalsdfjalsdfjalsdfjalsdkfjasldfjas</p>
          </section>

          <section className="Seccion4">
            <h2>Geotérmica:</h2>
            <p>afasldjfsalfjasldfjlasdjflasjdlfjasdlfkjasldfkjasldkfjalsdfjalsdfjalsdfjalsdkfjasldfjas</p>
          </section>
      </div>
      <h2>Gestion de las tablas que rico</h2>
      

    </Plantilla>
  );
};

export default Home;
