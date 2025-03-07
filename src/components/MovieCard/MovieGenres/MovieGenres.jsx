import React from "react";
import "./MovieGenres.css";

const MovieGenres = ({ genres }) => {
  return (
    <div className="genres">
      {genres &&
        genres.map((genre) => (
          <span key={genre.id} className="genre">
            {genre.name}
          </span>
        ))}
    </div>
  );
};

export default MovieGenres;
