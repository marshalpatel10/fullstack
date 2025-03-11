import React from "react";
import ReactDOM from "react-dom/client"; // Change this import
import FloorPlan from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FloorPlan />
  </React.StrictMode>
);
