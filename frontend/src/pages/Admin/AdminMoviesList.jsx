import { Link } from "react-router"
import { useGetAllMoviesQuery } from '../../redux/api/movie'



const AdminMoviesList = () => {
  const { data: movies } = useGetAllMoviesQuery()


  return (
      <div className="container mx-[6.5rem]">
      <div className="flex flex-col md:flex-row">
        <div className="p-3">
          <div className="ml-[2rem] text-xl font-bold h-12">
            All Movies ({movies?.length})
          </div>

          <div className="flex flex-wrap justify-around items-center p-[2rem]">
            {movies?.map((movie) => (
              <Link
                key={movie._id}
                to={`/admin/movies/update/${movie._id}`}
                className="block mb-4 overflow-hidden"
              >
                <div className="flex">
                  <div
                    key={movie._id}
                    className="max-w-[250px] scale-[0.9] md:scale-[0.85] m-[1rem] rounded overflow-hidden shadow-lg transition-all"
                  >
                    <img
                      src={movie.image}
                      alt={movie.name}
                      className="w-full h-40 object-cover"
                    />
                    <div className="px-6 py-4 border border-gray-400">
                      <div className="font-bold text-lg mb-2">{movie.name}</div>
                    </div>

                    <p className="text-gray-300 text-sm mt-3">{movie.detail}</p>

                    <div className="mt-[1.5rem] mb-[1rem]">
                      <Link
                        to={`/admin/movies/update/${movie._id}`}
                        className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-1 px-3 rounded"
                      >
                        Update Movie
                      </Link>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>

  )
}

export default AdminMoviesList