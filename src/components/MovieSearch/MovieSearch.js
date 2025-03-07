import React from "react";
import "./MovieSearch.css";
import { Input } from "antd";

const { Search } = Input;

const MovieSearch = ({ onSearch, loading }) => {
  return React.createElement(Search, {
    placeholder: "Поиск фильмов...",
    allowClear: true,
    onChange: (e) => onSearch(e.target.value),
    loading: loading,
    className: "movie-search",
  });
};

export default MovieSearch;
