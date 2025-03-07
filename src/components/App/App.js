import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import MoviesGrid from "../MoviesGrid";
import MovieSearch from "../MovieSearch";
import { Spin, Empty, Pagination } from "antd";
import { debounce } from "lodash";
import "antd/dist/antd.css";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmFiYWYzZGM3OTE1OTEzYTY3ODM4NjM0ODdjMzljZiIsIm5iZiI6MTc0MDc1ODYyMy44MjUsInN1YiI6IjY3YzFkZTVmOWFkY2QyNTYyNTM1YzcwZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WzbXT_jWuRBxnpcOeEZPmic-5mE1ThhXhRctbk1Zh-M",
  },
};

const PAGE_SIZE = 6;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searchQuery, setSearchQuery] = useState("return");

  // Получаем список жанров
  useEffect(() => {
    fetch("/api/genre/movie/list?language=en", options)
      .then((res) => res.json())
      .then((data) => {
        const genresMap = {};
        data.genres.forEach((genre) => {
          genresMap[genre.id] = genre.name;
        });
        setGenres(genresMap);
      })
      .catch((err) => console.error(err));
  }, []);

  // Функция для загрузки фильмов
  const loadMovies = useCallback(
    (query, page) => {
      setLoading(true);
      const normalizedQuery = query.trim();
      console.log(`Поисковый запрос: "${normalizedQuery}", Страница: ${page}`);

      fetch(
        `/api/search/movie?query=${encodeURIComponent(
          normalizedQuery
        )}&include_adult=false&language=en-US&page=${page}`,
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
          console.log(
            `Найдено фильмов: ${data.total_results}, Текущая страница: ${page}, Фильмов на странице: ${moviesWithGenres.length}`
          );
          setMovies(moviesWithGenres);
          setTotalResults(data.total_results);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    },
    [genres]
  );

  // Обработчик изменения страницы
  const handlePageChange = useCallback(
    (page) => {
      setCurrentPage(page);
      loadMovies(searchQuery, page);
    },
    [searchQuery, loadMovies]
  );

  // Debounced поиск
  const debouncedSearch = useCallback(
    debounce((query) => {
      const normalizedQuery = query.trim();
      setSearchQuery(normalizedQuery);
      setCurrentPage(1);
      loadMovies(normalizedQuery, 1);
    }, 500),
    [loadMovies]
  );

  // Загрузка фильмов при монтировании компонента
  useEffect(() => {
    loadMovies(searchQuery, currentPage);
  }, []);

  return React.createElement(
    "div",
    { className: "container" },
    React.createElement(MovieSearch, {
      onSearch: debouncedSearch,
      loading: loading,
    }),
    loading
      ? React.createElement(
          "div",
          { className: "spinner-container" },
          React.createElement(Spin, { size: "large" })
        )
      : movies.length > 0
      ? [
          React.createElement(MoviesGrid, { key: "grid", movies }),
          React.createElement(Pagination, {
            key: "pagination",
            current: currentPage,
            total: totalResults,
            pageSize: PAGE_SIZE,
            onChange: handlePageChange,
            showSizeChanger: false,
            showQuickJumper: false,
            className: "pagination",
          }),
        ]
      : React.createElement(Empty, {
          description: "Ничего не найдено",
        })
  );
};

export default App;
