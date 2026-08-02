import { Link } from "react-router"

const MovieCard = ({ movie }) => {
  return (
    <div className="px-2 py-2">
      <div className="relative group overflow-hidden rounded-xl bg-surface border border-border/50 shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:border-primary/50">
        <Link to={`/movies/${movie._id}`} className="block overflow-hidden relative aspect-[2/3]">
          <img
            src={movie.image}
            alt={movie.name}
            className="w-full h-full object-cover transition duration-300 ease-in-out transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <p className="text-white font-semibold text-sm sm:text-base line-clamp-2 drop-shadow">
              {movie.name}
            </p>
          </div>
        </Link>
        <div className="p-3 bg-surface sm:hidden">
          <p className="text-text-primary text-xs font-medium truncate">{movie.name}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieCard