import React from "react";
import "./MovieImage.css";

const MovieImage = ({ posterPath, title }) => {
  return (
    <img src={`https://image.tmdb.org/t/p/w500${posterPath}`} alt={title} />
  );
};

export default MovieImage;
