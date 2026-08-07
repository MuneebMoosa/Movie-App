import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import {
  useGetSpecificMovieQuery,
  useAddMovieReviewMutation
} from '../../redux/api/movie'
import MovieTabs from "./MovieTabs"
import { FiArrowLeft, FiCalendar, FiUsers } from "react-icons/fi"

const MovieDetails = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { id: movieId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { data: movie, refetch } = useGetSpecificMovieQuery(movieId);
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingMovieReview }] =
    useAddMovieReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        id: movieId,
        rating,
        comment,
      }).unwrap();

      refetch();

      toast.success("Review created successfully");
      setComment("");
    } catch (error) {
      toast.error(error.data || error.message);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 py-4">
      {/* Back Link */}
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface hover:bg-surface-light border border-border text-text-secondary hover:text-text-primary text-sm font-medium transition-colors"
        >
          <FiArrowLeft size={16} />
          <span>Go Back</span>
        </Link>
      </div>

      {/* Main Details Grid */}
      <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
        {/* Movie Poster */}
        <div className="w-full max-w-sm mx-auto lg:mx-0 lg:w-80 xl:w-96 shrink-0 rounded-2xl overflow-hidden shadow-2xl border border-border/80 bg-surface">
          <img
            src={`${API_URL}${movie?.image?.replace(/\\/g, "/")}`}
            alt={movie?.name}
            className="w-full aspect-[2/3] object-cover"
          />
        </div>

        {/* Movie Content & Info */}
        <div className="flex-1 w-full space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight">
              {movie?.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
              {movie?.year && (
                <div className="flex items-center gap-1.5 bg-surface px-3 py-1.5 rounded-lg border border-border">
                  <FiCalendar className="text-primary" />
                  <span>Release Year: <strong className="text-text-primary">{movie?.year}</strong></span>
                </div>
              )}
            </div>

            <p className="text-text-secondary leading-relaxed text-base sm:text-lg">
              {movie?.detail}
            </p>

            {movie?.cast && movie.cast.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                  <FiUsers className="text-primary" />
                  <span>Cast & Crew</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {movie.cast.map((c, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-md bg-surface-light text-text-secondary text-xs sm:text-sm border border-border"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Movie Reviews & Tabs */}
          <div className="border-t border-border pt-6">
            <MovieTabs
              loadingMovieReview={loadingMovieReview}
              userInfo={userInfo}
              submitHandler={submitHandler}
              rating={rating}
              setRating={setRating}
              comment={comment}
              setComment={setComment}
              movie={movie}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails;