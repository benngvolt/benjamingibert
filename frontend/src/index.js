import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import reportWebVitals from "./reportWebVitals";

import Nightingales from "./pages/Nightingales/Nightingales";
import Taihua from "./pages/Taihua/Taihua";
import Gemmes from "./pages/Gemmes/Gemmes";
import Home from "./pages/Home/Home";

import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { AppProvider } from "./utils/AppContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nightingales" element={<Nightingales />} />
          <Route path="/taihua" element={<Taihua />} />
          <Route path="/gemmes" element={<Gemmes />} />
        </Routes>
      </Router>
    </AppProvider>
  </React.StrictMode>
);

reportWebVitals();

