import React, { Suspense, lazy } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";

import reportWebVitals from "./reportWebVitals";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppProvider } from "./utils/AppContext";

import { HelmetProvider } from "react-helmet-async";

// Lazy-loaded pages (code splitting)
const Home = lazy(() => import("./pages/Home/Home"));
const Nightingales = lazy(() => import("./pages/Nightingales/Nightingales"));
const Taihua = lazy(() => import("./pages/Taihua/Taihua"));
const Gemmes = lazy(() => import("./pages/Gemmes/Gemmes"));
const About = lazy(() => import("./pages/About/About"));
const Live = lazy(() => import("./pages/Live/Live"));
const Salar = lazy(() => import("./pages/Salar/Salar"));
const Midigen = lazy(() => import("./pages/Midigen/Midigen"));

const container = document.getElementById("root");

const app = (
  <React.StrictMode>
    <HelmetProvider>
      <AppProvider>
        <Router>
          <Suspense fallback={<div />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/nightingales" element={<Nightingales />} />
              <Route path="/taihua" element={<Taihua />} />
              <Route path="/gemmes" element={<Gemmes />} />
              <Route path="/about" element={<About />} />
              <Route path="/live" element={<Live />} />
              <Route path="/midigen" element={<Midigen />} />
              <Route path="/34L4R" element={<Salar />} />
            </Routes>
          </Suspense>
        </Router>
      </AppProvider>
    </HelmetProvider>
  </React.StrictMode>
);

// Le HTML prérendu au build (scripts/prerender.js) est « hydraté » plutôt que remplacé, mais seulement
// s'il correspond à la page demandée : sur une URL non prérendue, le serveur renvoie la page d'accueil
// prérendue en repli, qu'il faut alors remplacer par un rendu normal.
const currentRoute = window.location.pathname.replace(/\/+$/, "") || "/";
if (container.dataset.prerenderedRoute === currentRoute) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}

reportWebVitals();

