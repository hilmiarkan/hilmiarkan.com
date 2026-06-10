import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  // <h1>THIS SITE HAS BEEN SEIZED</h1>
  <StrictMode>
    <App />
  </StrictMode>,
);
