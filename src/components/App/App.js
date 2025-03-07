import React, { useEffect, useState } from "react";
import "./App.css";
import MoviesGrid from "../MoviesGrid";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmFiYWYzZGM3OTE1OTEzYTY3ODM4NjM0ODdjMzljZiIsIm5iZiI6MTc0MDc1ODYyMy44MjUsInN1YiI6IjY3YzFkZTVmOWFkY2QyNTYyNTM1YzcwZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WzbXT_jWuRBxnpcOeEZPmic-5mE1ThhXhRctbk1Zh-M",
  },
};

const App = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState({});

  useEffect(() => {
    // Получаем список жанров
    fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", options)
      .then((res) => res.json())
      .then((data) => {
        const genresMap = {};
        data.genres.forEach((genre) => {
          genresMap[genre.id] = genre.name;
        });
        setGenres(genresMap);
      })
      .catch((err) => console.error(err));

    // Получаем фильмы
    fetch(
      "https://api.themoviedb.org/3/search/movie?query=return&include_adult=false&language=en-US&page=1",
      options
    )
      .then((res) => res.json())
      .then((data) => {
        const moviesWithGenres = data.results.map((movie) => ({
          ...movie,
          genres: movie.genre_ids.map((id) => ({
            id,
            name: genres[id],
          })),
        }));
        setMovies(moviesWithGenres);
      })
      .catch((err) => console.error(err));
  }, [genres]);

  return React.createElement(
    "div",
    { className: "container" },
    React.createElement(MoviesGrid, { movies })
  );
};

export default App;
