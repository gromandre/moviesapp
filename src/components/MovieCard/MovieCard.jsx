import React from "react";
import "./MovieCard.css";
import MovieImage from "./MovieImage/MovieImage.jsx";
import MovieInfo from "./MovieInfo/MovieInfo.jsx";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card" key={movie.id}>
      <MovieImage posterPath={movie.poster_path} title={movie.title} />
      <MovieInfo
        title={movie.title}
        releaseDate={movie.release_date}
        genres={movie.genres}
        overview={movie.overview}
      />
    </div>
  );
};

export default MovieCard;
