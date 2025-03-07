import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App";
import React from "react";

const root = createRoot(document.getElementById("root"));
root.render(React.createElement(StrictMode, null, React.createElement(App)));
