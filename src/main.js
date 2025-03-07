import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import { MovieProvider } from "./contexts/MovieContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  React.createElement(
    React.StrictMode,
    null,
    React.createElement(MovieProvider, null, React.createElement(App))
  )
);
