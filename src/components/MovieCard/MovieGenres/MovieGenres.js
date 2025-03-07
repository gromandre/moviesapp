import React from "react";
import "./MovieGenres.css";

const MovieGenres = ({ genres }) => {
  return React.createElement(
    "div",
    { className: "genres" },
    genres &&
      genres.map((genre) =>
        React.createElement(
          "span",
          {
            key: genre.id,
            className: "genre",
          },
          genre.name
        )
      )
  );
};

export default MovieGenres;
