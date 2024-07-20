import React from "react";
import ReactDOM from "react-dom/client";
import "./css/body.css";
import App from "./App";

// Ensure the root element is correctly referenced
const container = document.getElementById("app");
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
} else {
  console.error("Root container missing in index.html");
}
