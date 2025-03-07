import React from "react";
import { Empty } from "antd";
import "./EmptyState.css";

const EmptyState = () => {
  return React.createElement(Empty, {
    description: "Ничего не найдено",
  });
};

export default EmptyState;
