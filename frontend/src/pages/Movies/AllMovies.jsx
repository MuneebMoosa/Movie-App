import { useFetchGenreQuery } from "../../redux/api/genre"
import {
  useGetAllMoviesQuery,
  useGetNewMoviesQuery,
  useGetRandomMoviesQuery,
  useGetTopMoviesQuery
} from "../../redux/api/movie"
import MovieCard from "./MovieCard"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import banner from "../../assests/banner.jpg"
import { FiSearch, FiFilter } from "react-icons/fi"

import {
  setMoviesFilter,
  setFilteredMovies,
  setMovieYears,
  setUniqueYears,
} from '../../redux/features/movies/movieSlice'

const AllMovies = () => {
  const dispatch = useDispatch()
  const { data } = useGetAllMoviesQuery()
  const { data: genres } = useFetchGenreQuery()
  const { data: newMovies } = useGetNewMoviesQuery()
  const { data: topMovies } = useGetTopMoviesQuery()
  const { data: randomMovies } = useGetRandomMoviesQuery()

  const { moviesFilter, filteredMovies } = useSelector((state) => state.movies);

  const movieYears = data?.map((movie) => movie.year);
  const uniqueYears = Array.from(new Set(movieYears));

  useEffect(() => {
    if (!data) return;

    const movieYears = data.map((movie) => movie.year);
    const uniqueYears = [...new Set(movieYears)];
    dispatch(setFilteredMovies(data || []));
    dispatch(setMovieYears(movieYears));
    dispatch(setUniqueYears(uniqueYears));
  }, [data, dispatch]);

  const handleSearchChange = (e) => {
    dispatch(setMoviesFilter({ searchTerm: e.target.value }));

    const filteredMovies = data?.filter((movie) =>
      movie.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    dispatch(setFilteredMovies(filteredMovies));
  };

 
  const handleGenreClick = (genreId) => {
    dispatch( setMoviesFilter({ selectedGenre: genreId, }) );

    if (!genreId) {
      dispatch(setFilteredMovies(data));
      return;
    }

    const filterByGenre = data?.filter( (movie) => movie.genre === genreId );

    dispatch(setFilteredMovies(filterByGenre));
  };

  const handleYearChange = (year) => {
    dispatch( setMoviesFilter({ selectedYear: year, }))

    if (!year) {
      dispatch(setFilteredMovies(data));
      return;
    }
    const filterByYear = data?.filter((movie) => movie.year === +year);
    dispatch(setFilteredMovies(filterByYear));
  };

  const handleSortChange = (sortOption) => {
    switch (sortOption) {
      case "new":
        dispatch( setMoviesFilter({ selectedSort: sortOption, }))
        dispatch(setFilteredMovies(newMovies));
        break;
      case "top":
        dispatch( setMoviesFilter({ selectedSort: sortOption, }))
        dispatch(setFilteredMovies(topMovies));
        break;
      case "random":
        dispatch( setMoviesFilter({ selectedSort: sortOption, }))
        dispatch(setFilteredMovies(randomMovies));
        break;

      default:
        dispatch(setMoviesFilter({ selectedSort: "", }));
        dispatch(setFilteredMovies(data));
        break;
    }
  };

  return (
    <div className="w-full space-y-8 py-4">
      {/* Hero Banner Section */}
      <section className="relative rounded-3xl overflow-hidden border border-border shadow-2xl bg-surface">
        <div
          className="relative min-h-[320px] sm:min-h-[380px] flex flex-col items-center justify-center p-6 sm:p-12 text-center bg-cover bg-center"
          style={{ backgroundImage: `url(${banner})` }}
        >
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/60"></div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-3">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white drop-shadow-md">
              The Movies Hub
            </h1>
            <p className="text-text-secondary text-sm sm:text-lg font-medium">
              Cinematic Odyssey: Unveiling the Magic of Movies
            </p>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="p-4 sm:p-6 bg-surface/90 backdrop-blur-md border-t border-border">
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Search Bar */}
            <div className="relative flex items-center">
              <FiSearch className="absolute left-4 text-text-secondary text-lg" />
              <input
                type="text"
                className="w-full pl-11 pr-4 py-3 bg-surface-light border border-border rounded-xl text-text-primary placeholder-text-secondary text-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="Search Movie..."
                value={moviesFilter.searchTerm || ""}
                onChange={handleSearchChange}
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Genre Filter */}
              <div className="relative">
                <select
                  className="w-full px-4 py-2.5 bg-surface-light border border-border rounded-xl text-text-primary text-sm font-medium focus:outline-none focus:border-primary transition-colors cursor-pointer "
                  value={moviesFilter.selectedGenre || ""}
                  onChange={(e) => handleGenreClick(e.target.value)}
                >
                  <option value="">All Genres</option>
                  {genres?.map((genre) => (
                    <option key={genre._id} value={genre._id}>
                      {genre.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year Filter */}
              <div className="relative">
                <select
                  className="w-full px-4 py-2.5 bg-surface-light border border-border rounded-xl text-text-primary text-sm font-medium focus:outline-none focus:border-primary transition-colors cursor-pointer"
                  value={moviesFilter.selectedYear || ""}
                  onChange={(e) => handleYearChange(e.target.value)}
                >
                  <option value="">All Years</option>
                  {uniqueYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort By Filter */}
              <div className="relative">
                <select
                  className="w-full px-4 py-2.5 bg-surface-light border border-border rounded-xl text-text-primary text-sm font-medium focus:outline-none focus:border-primary transition-colors cursor-pointer"
                  value={moviesFilter.selectedSort || ""}
                  onChange={(e) => handleSortChange(e.target.value)}
                >
                  <option value="">Sort By</option>
                  <option value="new">New Movies</option>
                  <option value="top">Top Movies</option>
                  <option value="random">Random Movies</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Movies Grid Section */}
      <section className="w-full">
        {filteredMovies && filteredMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-surface/50 border border-border rounded-2xl">
            <p className="text-text-secondary text-base font-medium">
              No movies found matching your selection.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}

export default AllMovies
