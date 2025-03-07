import React from "react";
import { Pagination } from "antd";
import "./MoviePagination.css";

const MoviePagination = ({ current, total, pageSize, onChange }) => {
  return (
    <Pagination
      current={current}
      total={total}
      pageSize={pageSize}
      onChange={onChange}
      showSizeChanger={false}
      showQuickJumper={false}
      className="pagination"
    />
  );
};

export default MoviePagination;
