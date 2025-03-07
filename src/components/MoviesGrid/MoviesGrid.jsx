import React from "react";
import "./MoviesGrid.css";
import MovieCard from "../MovieCard/MovieCard.jsx";

const MoviesGrid = ({ movies }) => {
  // Берем только первые 6 фильмов
  const displayedMovies = movies.slice(0, 6);

  return (
    <div className="movies-grid">
      {displayedMovies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MoviesGrid;
