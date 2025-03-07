import React from "react";
import "./MovieInfo.css";
import MovieDate from "../MovieDate/MovieDate.jsx";
import MovieGenres from "../MovieGenres/MovieGenres.jsx";

const truncateText = (text, maxLength = 150) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

const MovieInfo = ({ title, releaseDate, genres, overview }) => {
  return (
    <div className="movie-info">
      <h2>{title}</h2>
      <MovieDate releaseDate={releaseDate} />
      <MovieGenres genres={genres} />
      <p className="overview">{truncateText(overview)}</p>
    </div>
  );
};

export default MovieInfo;
