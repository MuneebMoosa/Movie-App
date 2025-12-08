import { useState } from "react"
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery
} from "../../redux/api/movie"

import {useFetchGenreQuery} from '../../redux/api/genre';
import SliderUtil from '../../comonents/SliderUtil'

const MoviesContainerPage = () => {
  const {data} = useGetNewMoviesQuery()
  const {data: topMovies} = useGetTopMoviesQuery()
  const {data: genres} = useFetchGenreQuery()
  const {data: randomMovies} = useGetRandomMoviesQuery()


  const [selectedGenre , setSelectedGenre] = useState(null);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
  };

  const filteredMovies = data?.filter(
    (movie) => selectedGenre === null || movie.genre === selectedGenre
  );

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between items-center ml-[5rem]">
      <nav className="  mb-[3rem] flex flex-row xl:flex-col lg:flex-col md:flex-row sm:flex-row">
        {genres?.map((g) => (
          <button
            key={g._id}
            className={`transition duration-300 ease-in-out  hover:bg-teal-200 block p-2 rounded mb-[1rem] text-lg ${
              selectedGenre === g._id ? "bg-teal-200" : ""
            }`}
            onClick={() => handleGenreClick(g._id)}
          >
            {g.name}
          </button>
        ))}
      </nav>

      <section className="flex flex-col justify-center items-center w-full md:w-[83%] ">
        <div className="w-full  mb-7 ">
          <h1 className="mb-5">Choose For You</h1>
          <SliderUtil data={randomMovies} />
        </div>

        <div className="w-full  mb-7">
          <h1 className="mb-5">Top Movies</h1>
          <SliderUtil data={topMovies} />
        </div>

        <div className="w-full  mb-7">
          <h1 className="mb-5">Choose Movie</h1>
          <SliderUtil data={filteredMovies} />
        </div>
      </section>
    </div>
  )
}

export default MoviesContainerPage