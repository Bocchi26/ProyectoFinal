import React from "react";
import Plantilla from "../Plantilla/plantilla";
import "./inicio.css";

const Home = () => {
  return (
    <Plantilla>
      <div className="contenedor-fondo">

      <div className="links">
            <a href="#SubTitulo">¿Qué es?</a>
            <a href="#subTitulo2">Beneficios</a>
            <a href="#titulosecciones">Aplicación</a>
        </div>

        

        <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      

        <h1 id="Titulo">Energía Geótermica</h1>

        <p id="primerTexto">¿Sabías que bajo nuestros pies se encuentra una fuente inagotable de energía que ha existido desde el nacimiento de la Tierra? 
        La energía geotérmica, un regalo del calor interno del planeta, es una solución limpia y constante que nos conecta con la fuerza primordial que mueve 
        los continentes y alimenta los volcanes.</p>
        <br></br>

        <div className="segundaParte">
          <div className="subpartedos">
            <h2 id="SubTitulo">¿Qué es?</h2>
            <p id="segundoTexto"> La energía geotérmica es una fuente de energía renovable
              que se obtiene del calor interno de la Tierra. Este calor proviene principalmente
              de la desintegración de elementos radiactivos en el núcleo y manto terrestre, así
              como del calor residual del proceso de formación del planeta. Se manifiesta en forma
              de depósitos de agua caliente, vapor, rocas calientes o magma cercano a la superficie.
              El aprovechamiento de este calor puede realizarse mediante diversas tecnologías para generar
              electricidad, proporcionar calefacción o refrigeración, y para usos industriales.</p>
            
            <img id="imagen1" src="https://thumbs.dreamstime.com/b/concepto-de-la-energía-geotérmica-central-eléctrica-amistosa-generación-eco-104105147.jpg"></img>
             <div className="tercerinfo">
                <h2 id="subTitulo2">Beneficios de la Energía Geotérmica</h2>
                <p id="tercerTexto">La energía geotérmica es una de las fuentes de energía renovable más sostenibles y menos contaminantes.
                  A continuación, te detallo sus beneficios más destacados:</p>
                  <ul className="naturalezarb">
                    <p>Naturaleza renovable:</p>
                    <li>La energía geotérmica utiliza el calor almacenado en el interior de la Tierra, que es prácticamente inagotable a escala humana. Este calor proviene de la desintegración radiactiva natural en el núcleo terrestre,
                      lo que asegura su continuidad durante miles de años.</li>
                    <p>Bajas emisiones:</p>
                    <li>Las plantas geotérmicas emiten una fracción de los gases de efecto invernadero que liberan las plantas de combustibles fósiles. Incluso en los sistemas que emiten pequeñas cantidades de dióxido de carbono (CO₂)
                      y sulfuro de hidrógeno (H₂S), las emisiones son considerablemente menores.</li>
                    <p>Alternativa estable:</p>
                    <li>Al proporcionar una fuente de energía local y renovable, la geotermia reduce la necesidad de importar combustibles fósiles,
                      como el petróleo, gas natural y carbón.</li>
                  </ul>
              </div>
            </div>
        </div>
        
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br>

        <div className="secciones">
          <h2 id="titulosecciones">Aplicaciones de la Energía Geotérmica</h2>
          <p id="cuartotexto">La energía geotérmica es una fuente versátil que se utiliza en diferentes sectores,
          desde la generación de electricidad hasta aplicaciones en hogares,
          agricultura e industria. A continuación, se explican las principales aplicaciones:</p>
          <br></br>
          <br></br>

          <ol>
          <section >
            <li>Generación de electricidad</li>
            <p>La generación de electricidad es una de las aplicaciones más importantes de la energía geotérmica,
              particularmente en regiones con actividad geotérmica significativa.</p>
            <ul>
              <h4>Plantas de vapor seco:</h4>
              <li>Utilizan directamente el vapor extraído de reservorios subterráneos para mover turbinas generadoras de electricidad.
                Son las más antiguas y eficientes, pero requieren fuentes específicas de vapor seco.</li>
            </ul>
          </section>
          
          <section>
            <li>Calefacción y refrigeración geotérmica en hogares y edificios</li>
            <p>Los sistemas de calefacción y refrigeración geotérmica utilizan bombas de calor geotérmicas (GHP, por sus siglas en inglés) para aprovechar el calor constante del subsuelo,
              incluso en áreas sin actividad volcánica.</p>
            <ul>
              <h4>Funcionamiento:</h4>
              <li>Invierno: La bomba transfiere calor del subsuelo al interior del edificio para calefacción.</li>
              <li>Verano: El sistema invierte el proceso, transfiriendo calor del edificio al subsuelo para enfriar los espacios.</li>
            </ul>
          </section>
          
          <section>
            <li>Uso en la agricultura y la industria</li>
            <p>La energía geotérmica también se utiliza en sectores específicos donde el calor es fundamental.</p>
            <ul>
              <h4>En la agricultura:</h4>
              <li>Invernaderos: El calor geotérmico permite mantener temperaturas óptimas para el cultivo de flores, frutas y verduras, incluso en climas fríos.</li>
              <li>Piscicultura: Se calientan estanques para la cría de peces como tilapias y camarones.</li>
            </ul>
          </section>
        </ol>
          
        </div>
        
        
        
        
        

      </div>
    </Plantilla>
  );
};

export default Home;
