// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/inicio";
import Calculadora from "./components/Calculadora/calculadora";
import Graficos from "./components/Graficos/graficos";

const App = () => {
  return (
    <Router id="sexo">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculadora" element={<Calculadora />} />
        <Route path="/graficos" element={<Graficos />} />
      </Routes>
    </Router>
  );
};

export default App;

