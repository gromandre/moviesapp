import React from "react";
import "./MoviesGrid.css";
import MovieCard from "../MovieCard";

const MoviesGrid = ({ movies }) => {
  return React.createElement(
    "div",
    { className: "movies-grid" },
    movies.map((movie) =>
      React.createElement(MovieCard, { key: movie.id, movie })
    )
  );
};

export default MoviesGrid;
