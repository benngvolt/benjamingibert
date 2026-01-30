import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import reportWebVitals from "./reportWebVitals";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppProvider } from "./utils/AppContext";

// Lazy-loaded pages (code splitting)
const Home = lazy(() => import("./pages/Home/Home"));
const Nightingales = lazy(() => import("./pages/Nightingales/Nightingales"));
const Taihua = lazy(() => import("./pages/Taihua/Taihua"));
const Gemmes = lazy(() => import("./pages/Gemmes/Gemmes"));

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AppProvider>
      <Router>
        <Suspense fallback={<div />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nightingales" element={<Nightingales />} />
            <Route path="/taihua" element={<Taihua />} />
            <Route path="/gemmes" element={<Gemmes />} />
          </Routes>
        </Suspense>
      </Router>
    </AppProvider>
  </React.StrictMode>
);

reportWebVitals();

