import React from "react";
import ReactDOM from "react-dom/client";
import AppWithStoreAndRoutes from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<AppWithStoreAndRoutes />);

reportWebVitals();
