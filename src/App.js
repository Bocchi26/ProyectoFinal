// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/inicio";
import DatosHistoricos from "./components/DatosHistoricos/historia";
import Graficos from "./components/Graficos/graficos";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/historia" element={<DatosHistoricos />} />
        <Route path="/graficos" element={<Graficos />} />
      </Routes>
    </Router>
  );
};

export default App;

