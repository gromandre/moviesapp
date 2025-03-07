import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import MoviesGrid from "../MoviesGrid/MoviesGrid.jsx";
import MovieSearch from "../MovieSearch/MovieSearch.jsx";
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
const MAX_PAGES = 25; // Максимальное количество страниц в API TMDB

const App = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

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
      if (!query.trim()) {
        setMovies([]);
        setTotalResults(0);
        return;
      }

      setLoading(true);
      const normalizedQuery = query.trim();
      console.log(`Поисковый запрос: "${normalizedQuery}", Страница: ${page}`);

      // Вычисляем, какую страницу API нам нужно запросить
      const apiPage = Math.ceil(page / 3); // Так как на одной странице API 20 фильмов, а нам нужно 6

      if (apiPage > MAX_PAGES) {
        setLoading(false);
        return;
      }

      fetch(
        `/api/search/movie?query=${encodeURIComponent(
          normalizedQuery
        )}&include_adult=false&language=en-US&page=${apiPage}`,
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

          // Вычисляем индексы для текущей страницы
          const startIndex = ((page - 1) % 3) * PAGE_SIZE;
          const endIndex = startIndex + PAGE_SIZE;
          const currentPageMovies = moviesWithGenres.slice(
            startIndex,
            endIndex
          );

          console.log(
            `Найдено фильмов: ${data.total_results}, Текущая страница: ${page}, Фильмов на странице: ${currentPageMovies.length}`
          );

          // Ограничиваем общее количество результатов
          const maxResults = Math.min(data.total_results, MAX_PAGES * 20);

          setMovies(currentPageMovies);
          setTotalResults(maxResults);
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

  // Обработчик поиска с debounce
  const handleSearch = useCallback(
    debounce((query) => {
      const normalizedQuery = query.trim();
      setSearchQuery(normalizedQuery);
      setCurrentPage(1);
      loadMovies(normalizedQuery, 1);
    }, 500),
    [loadMovies]
  );

  return (
    <div className="container">
      <MovieSearch onSearch={handleSearch} loading={loading} />
      {loading ? (
        <div className="spinner-container">
          <Spin size="large" />
        </div>
      ) : movies.length > 0 ? (
        <>
          <MoviesGrid movies={movies} />
          <Pagination
            current={currentPage}
            total={totalResults}
            pageSize={PAGE_SIZE}
            onChange={handlePageChange}
            showSizeChanger={false}
            showQuickJumper={false}
            className="pagination"
          />
        </>
      ) : searchQuery ? (
        <Empty description="Ничего не найдено" />
      ) : null}
    </div>
  );
};

export default App;
