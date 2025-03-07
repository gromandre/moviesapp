import React from "react";
import "./MovieCard.css";
import MovieImage from "./MovieImage/MovieImage";
import MovieInfo from "./MovieInfo/MovieInfo";

const MovieCard = ({ movie }) => {
  return React.createElement(
    "div",
    { className: "movie-card", key: movie.id },
    React.createElement(MovieImage, {
      posterPath: movie.poster_path,
      title: movie.title,
    }),
    React.createElement(MovieInfo, {
      title: movie.title,
      releaseDate: movie.release_date,
      genres: movie.genres,
      overview: movie.overview,
    })
  );
};

export default MovieCard;
