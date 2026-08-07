import { useState } from "react"
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery
} from "../../redux/api/movie"

import { useFetchGenreQuery } from '../../redux/api/genre';
import SliderUtil from '../../comonents/SliderUtil'

const MoviesContainerPage = () => {
  const { data } = useGetNewMoviesQuery()
  const { data: topMovies } = useGetTopMoviesQuery()
  const { data: genres } = useFetchGenreQuery()
  const { data: randomMovies } = useGetRandomMoviesQuery()

  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId === selectedGenre ? null : genreId);
  };

  const filteredMovies = data?.filter(
    (movie) => selectedGenre === null || movie.genre === selectedGenre
  );

  return (
    <div className="w-full space-y-10">
      <div className="w-full">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 tracking-tight">
          Chosen For You
        </h2>
        <SliderUtil data={randomMovies} />
      </div>

      {/* Top Movies Carousel */}
      <div className="w-full">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 tracking-tight">
          Top Movies
        </h2>
        <SliderUtil data={topMovies} />
      </div>

      {/* Genre Filter Card & Choose Movie Section */}
      <div className="w-full space-y-6 pt-4">
        {/* Horizontal Genre Filter Card */}
        <div className="w-full p-4 sm:p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-semibold text-text-secondary uppercase tracking-wider">
              Filter by Genre
            </h3>
          </div>
          <div className="flex items-center  gap-4 overflow-x-auto pb-1 scrollbar-none flex-wrap">
            <button
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                selectedGenre === null
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "bg-surface-light hover:bg-border text-text-secondary hover:text-text-primary border border-border/60"
              }`}
              onClick={() => setSelectedGenre(null)}
            >
              All Genres
            </button>
            {genres?.map((g) => (
              <button
                key={g._id}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  selectedGenre === g._id
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "bg-surface-light hover:bg-border text-text-secondary hover:text-text-primary border border-border/60"
                }`}
                onClick={() => handleGenreClick(g._id)}
              >
                {g.name}
              </button>
            ))}
          </div>
        </div>

        {/* Choose Movie Carousel */}
        <div className="w-full">
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 tracking-tight">
            {selectedGenre ? "Genre Movies" : "Choose Movie"}
          </h2>
          <SliderUtil data={filteredMovies} />
        </div>
      </div>
    </div>
  )

}

export default MoviesContainerPage

