import React from "react";
import "./MoviesGrid.css";
import MovieCard from "../MovieCard";

const MoviesGrid = ({ movies }) => {
  // Берем только первые 6 фильмов
  const displayedMovies = movies.slice(0, 6);

  return React.createElement(
    "div",
    { className: "movies-grid" },
    displayedMovies.map((movie) =>
      React.createElement(MovieCard, {
        key: movie.id,
        movie: movie,
      })
    )
  );
};

export default MoviesGrid;
