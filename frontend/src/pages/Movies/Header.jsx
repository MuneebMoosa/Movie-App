import { useGetNewMoviesQuery } from "../../redux/api/movie"
import { Link } from 'react-router'
import SliderUtil from "../../comonents/SliderUtil"

const Header = () => {
  const { data } = useGetNewMoviesQuery()

  return (
    <div className="flex flex-col lg:flex-row justify-between items-stretch gap-6 my-4">
      <nav className="flex flex-row lg:flex-col gap-2 w-full lg:w-48 shrink-0">
        <Link
          to="/"
          className="flex-1 lg:flex-none text-center lg:text-left px-4 py-2.5 rounded-lg bg-surface hover:bg-surface-light text-text-primary font-medium border border-border transition-all duration-200 hover:border-primary/50 hover:text-primary"
        >
          Home
        </Link>
        <Link
          to="/movies"
          className="flex-1 lg:flex-none text-center lg:text-left px-4 py-2.5 rounded-lg bg-surface hover:bg-surface-light text-text-primary font-medium border border-border transition-all duration-200 hover:border-primary/50 hover:text-primary"
        >
          Browse Movies
        </Link>
      </nav>

      <div className="w-full lg:flex-1 min-w-0">
        <SliderUtil data={data} />
      </div>
    </div>
  )
}

export default Header