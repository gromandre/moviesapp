const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmFiYWYzZGM3OTE1OTEzYTY3ODM4NjM0ODdjMzljZiIsIm5iZiI6MTc0MDc1ODYyMy44MjUsInN1YiI6IjY3YzFkZTVmOWFkY2QyNTYyNTM1YzcwZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WzbXT_jWuRBxnpcOeEZPmic-5mE1ThhXhRctbk1Zh-M",
  },
};

class MovieService {
  static async getGenres() {
    try {
      const response = await fetch(
        "/api/genre/movie/list?language=en",
        options
      );
      const data = await response.json();
      const genresMap = {};
      data.genres.forEach((genre) => {
        genresMap[genre.id] = genre.name;
      });
      return genresMap;
    } catch (error) {
      console.error("Error fetching genres:", error);
      throw error;
    }
  }

  static async searchMovies(query, page) {
    try {
      const normalizedQuery = query.trim();
      const response = await fetch(
        `/api/search/movie?query=${encodeURIComponent(
          normalizedQuery
        )}&include_adult=false&language=en-US&page=${page}`,
        options
      );
      const data = await response.json();
      return {
        results: data.results,
        totalResults: data.total_results,
      };
    } catch (error) {
      console.error("Error searching movies:", error);
      throw error;
    }
  }
}

export default MovieService;
