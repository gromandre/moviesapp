import React from "react";
import "./MovieInfo.css";
import MovieGenres from "../MovieGenres/MovieGenres";
import MovieDate from "../MovieDate/MovieDate";

const truncateText = (text, maxLength = 150) => {
  if (!text || text.length <= maxLength) return text;
  const truncated = text.substr(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(" ");
  return truncated.substr(0, lastSpaceIndex) + "...";
};

const MovieInfo = ({ title, releaseDate, genres, overview }) => {
  return React.createElement(
    "div",
    { className: "movie-info" },
    React.createElement("h2", null, title),
    React.createElement(MovieDate, { releaseDate }),
    React.createElement(MovieGenres, { genres }),
    React.createElement("p", { className: "overview" }, truncateText(overview))
  );
};

export default MovieInfo;
