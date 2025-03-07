import React, { useState } from "react";
import "./MovieSearch.css";
import { Input } from "antd";

const MovieSearch = ({ onSearch }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
    onSearch(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && value.trim()) {
      onSearch(value); // Повторный поиск при нажатии Enter
    }
  };

  return (
    <Input
      placeholder="Type to search..."
      allowClear={true}
      value={value}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      className="movie-search"
    />
  );
};

export default MovieSearch;
