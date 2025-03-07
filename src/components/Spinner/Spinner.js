import React from "react";
import { Spin } from "antd";
import "./Spinner.css";

const Spinner = () => {
  return React.createElement(
    "div",
    { className: "spinner-container" },
    React.createElement(Spin, { size: "large" })
  );
};

export default Spinner;
