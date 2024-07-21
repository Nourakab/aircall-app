import React from "react";
import ReactDOM from "react-dom/client";
import "./css/body.css";
import WrappedApp from "./App";

const container = document.getElementById("app");
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<WrappedApp />);
} else {
  console.error("Root container missing in index.html");
}
