import React from "react";
import ReactDOM from "react-dom/client";
import "./css/body.css";
import App from "./App";
import { UserProvider } from "./context/UserContext";

const container = document.getElementById("app");
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <UserProvider>
      <App />
    </UserProvider>
  );
} else {
  console.error("Root container missing in index.html");
}
