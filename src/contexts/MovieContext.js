import React, { createContext, useState, useContext, useCallback } from "react";
import MovieService from "../services/MovieService";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const loadGenres = useCallback(async () => {
    try {
      const genresData = await MovieService.getGenres();
      setGenres(genresData);
    } catch (error) {
      console.error("Error loading genres:", error);
    }
  }, []);

  const loadMovies = useCallback(
    async (query, page) => {
      setLoading(true);
      try {
        const { results, totalResults } = await MovieService.searchMovies(
          query,
          page
        );
        const moviesWithGenres = results.map((movie) => ({
          ...movie,
          genres: movie.genre_ids.map((id) => ({
            id,
            name: genres[id],
          })),
        }));
        setMovies(moviesWithGenres);
        setTotalResults(totalResults);
      } catch (error) {
        console.error("Error loading movies:", error);
      } finally {
        setLoading(false);
      }
    },
    [genres]
  );

  const value = {
    movies,
    genres,
    loading,
    currentPage,
    totalResults,
    searchQuery,
    setCurrentPage,
    setSearchQuery,
    loadGenres,
    loadMovies,
  };

  return React.createElement(MovieContext.Provider, { value }, children);
};

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovies must be used within a MovieProvider");
  }
  return context;
};
