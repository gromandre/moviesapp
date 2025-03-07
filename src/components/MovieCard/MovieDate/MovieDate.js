import React from "react";
import "./MovieDate.css";
import { format } from "date-fns";

const MovieDate = ({ releaseDate }) => {
  const formattedDate = releaseDate
    ? format(new Date(releaseDate), "MMMM d, yyyy")
    : "No release date";

  return React.createElement("p", { className: "movie-date" }, formattedDate);
};

export default MovieDate;
