import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import "./barraNavegacion.css";

const BarraNavegacion = () => {
    // para controlar si la barra de navegacion esta deplegada 
    const [abierto, setAbierto] = useState(false);
    
    // poder alternar la barra entre abierdo y cerrado, pues poder hacer la animacion
    const alternarBarra = () => setAbierto(!abierto);

    //rutas e iconos 
    const links = [ 
        {name: "Inicio", path:"/", icon: "🌎"},
        {name: "Hechos \n Históricos", path:"/historia", icon: "🕰️"},
        {name: "Graficas", path:"/graficos", icon: "📊"},
    ];
    return (
        <div className={`barraNavegacion ${abierto ? "abrir" : ""}`}>
            <div className="botton-cambiar" onClick={alternarBarra}>  
            ≡
            </div>
            <nav className="navegacion">
            {links.map((link, index) => (
                    <NavLink
                        key={index}
                        to={link.path}
                        className={({ isActive }) => (isActive ? "activo" : "")}>
                            <span   className="icon">{link.icon}</span>
                            {abierto && <span className="text"> {link.name}</span>}
                        </NavLink> 
                ))}
            </nav>
           
        </div> 
    );
};

export default BarraNavegacion;