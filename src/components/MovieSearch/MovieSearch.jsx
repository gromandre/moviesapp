import React from "react";
import "./MovieSearch.css";
import { Input } from "antd";

const MovieSearch = ({ onSearch }) => {
  return (
    <Input
      placeholder="Type to search..."
      allowClear={true}
      onChange={(e) => onSearch(e.target.value)}
      className="movie-search"
    />
  );
};

export default MovieSearch;
