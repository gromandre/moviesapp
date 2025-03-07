import React from "react";
import "./MoviesGrid.css";
import MovieCard from "../MovieCard/MovieCard.jsx";

const MoviesGrid = ({ movies }) => {
  return (
    <div className="movies-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MoviesGrid;
