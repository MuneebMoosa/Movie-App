import { Link } from "react-router"
import { useGetAllMoviesQuery } from '../../redux/api/movie'



const AdminMoviesList = () => {
  const { data: movies } = useGetAllMoviesQuery()


  return (
  <div className=" text-white px-6 py-10">
    <div className="max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold text-teal-400">
            All Movies
          </h1>

          <p className="text-gray-400 mt-2">
            Total Movies:{" "}
            <span className="text-white font-semibold">
              {movies?.length}
            </span>
          </p>
        </div>
      </div>

      {/* Movies Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

        {movies?.map((movie) => (
          <Link
            key={movie._id}
            to={`/admin/movies/update/${movie._id}`}
            className="group"
          >
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-teal-500/20 hover:-translate-y-2 transition duration-300">

              {/* Poster */}
              <div className="overflow-hidden">
                <img
                  src={movie.image}
                  alt={movie.name}
                  className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* Details */}
              <div className="p-5">

                <h2 className="text-xl font-bold text-white mb-3 line-clamp-1">
                  {movie.name}
                </h2>

                <p className="text-sm text-gray-400 line-clamp-3 mb-6">
                  {movie.detail}
                </p>

                <button
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-lg transition"
                >
                  Update Movie
                </button>

              </div>

            </div>
          </Link>
        ))}

      </div>
    </div>
  </div>
);
}

export default AdminMoviesList