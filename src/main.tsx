import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./app.tsx";

// Inicializa o tema antes do React renderizar para evitar flash
const savedMode = localStorage.getItem("darkMode");
if (savedMode === "enabled") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);