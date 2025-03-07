import React from "react";
import { Pagination } from "antd";
import "./MoviePagination.css";

const MoviePagination = ({ current, total, pageSize, onChange }) => {
  return React.createElement(Pagination, {
    current,
    total,
    pageSize,
    onChange,
    showSizeChanger: false,
    showQuickJumper: false,
    className: "pagination",
  });
};

export default MoviePagination;
