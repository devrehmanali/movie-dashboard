import { useState, useEffect, useCallback } from "react";
import MovieDetailsCard from "./components/movei/movei-details-card";
import OscarStats from "./components/movei/oscar-stats";
import RatingAndInfo from "./components/movei/rating-info";
import CastList from "./components/movei/cast-list";
import Loader from "./components/shared/loader/loader"; // Import the Loader component
import { useFetchMovies } from "./hooks/use-fetch-moveis/useFetchMoveis";

const MOVIES_PER_PAGE = 5;

const App = () => {
  const { movies, loading, error } = useFetchMovies(); // Fetch movies using the custom hook
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Select first movie by default if no movie is selected
  useEffect(() => {
    if (movies.length > 0 && !selectedMovie) {
      setSelectedMovie(movies[0]);
    }
  }, [movies, selectedMovie]);

  // Filter movies based on genre
  const filterMoviesByGenre = useCallback(() => {
    if (selectedGenre === "") {
      setFilteredMovies(movies);
    } else {
      setFilteredMovies(
        movies.filter((movie) => movie.genre.includes(selectedGenre))
      );
    }
  }, [selectedGenre, movies]);

  // Handle page change
  const paginate = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
  }, []);

  // Calculate current page movies
  const getCurrentMovies = () => {
    const indexOfLastMovie = currentPage * MOVIES_PER_PAGE;
    const indexOfFirstMovie = indexOfLastMovie - MOVIES_PER_PAGE;
    return filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);
  };

  // Get total pages for pagination
  const getTotalPages = () =>
    Math.ceil(filteredMovies.length / MOVIES_PER_PAGE);

  // Handle movie selection
  const handleSelectMovie = useCallback((movie) => {
    setSelectedMovie(movie);
  }, []);

  // Trigger genre filtering when movies or selectedGenre changes
  useEffect(() => {
    filterMoviesByGenre();
  }, [filterMoviesByGenre]);

  // Error and loading states
  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-screen">
      <div className="min-h-screen bg-gray-50 flex flex-col justify-start items-center py-8 px-6 sm:px-12">
        {/* Header Section */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="flex flex-col w-full md:w-1/4 mb-4 md:mb-0">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Filter by Genre
            </h2>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full px-4 py-2 text-gray-500 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Genres</option>
              {[...new Set(movies.flatMap((movie) => movie.genre))].map(
                (genre, index) => (
                  <option key={index} value={genre}>
                    {genre}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="flex flex-col w-full md:w-1/4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Search Movies
            </h2>
            <input
              type="text"
              className="w-full px-4 py-2 text-gray-500 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search by title"
              onChange={(e) => {
                const searchText = e.target.value.toLowerCase();
                setFilteredMovies(
                  movies.filter((movie) =>
                    movie.title.toLowerCase().includes(searchText)
                  )
                );
                setCurrentPage(1); // Reset to first page after search
              }}
            />
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex w-full max-w-screen-xl gap-8">
          {/* Left Section - Movie List */}
          <div className="w-full md:w-1/4 h-fit bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Select a Movie
            </h2>
            {movies.length > 0 ? (
              <>
                <ul className="space-y-3">
                  {getCurrentMovies().map((movie, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelectMovie(movie)}
                      className={`cursor-pointer px-4 py-2 text-gray-700 rounded-lg ${
                        selectedMovie?.title === movie.title
                          ? " bg-blue-500 text-white"
                          : ""
                      } hover:bg-blue-500 hover:text-white transition-all duration-200`}
                    >
                      {movie.title}
                    </li>
                  ))}
                </ul>

                {/* Pagination */}
                <div className="flex justify-center items-center mt-6 space-x-2">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:opacity-50"
                  >
                    Prev
                  </button>
                  <span className="px-4 py-2 text-gray-400">
                    {currentPage} of {getTotalPages()}
                  </span>
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === getTotalPages()}
                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            )}
          </div>

          {/* Right Section - Movie Details */}
          {/* {selectedMovie && ( */}

          <div className="w-full md:w-3/4 bg-white p-6 rounded-lg shadow-lg">
            {/* Top Section - Movie and Rating Card */}
            <div className="flex justify-between space-x-8 mb-8">
              <div className="w-1/2">
                <MovieDetailsCard movie={selectedMovie} />
              </div>
              <div className="w-1/2">
                <OscarStats movie={selectedMovie} />
              </div>
            </div>

            {/* Bottom Section - Oscar Stats and Cast */}
            <div className="flex justify-between space-x-8">
              <div className="w-1/2">
                <RatingAndInfo movie={selectedMovie} />
              </div>
              <div className="w-1/2">
                <CastList movie={selectedMovie} />
              </div>
            </div>
          </div>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default App;
