import { useState } from "react"
import { useParams , Link} from "react-router-dom"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { useGetSpecificMovieQuery,
        useAddMovieReviewMutation
} from '../../redux/api/movie'
import MovieTabs from "./MovieTabs"
const MovieDetails = () => {
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
      } catch (error) {
        toast.error(error.data || error.message);
      }
    };


    
  return (
     <>
    
      <div className="my-[1rem]">
        <Link
          to="/"
          className="  text-white font-semibold hover:underline ml-[10rem]"
        >
          Go Back
        </Link>
      </div>

      <div className="flex justify-between m-[6rem]">
         {/* photo start */}
        <div className="flex justify-center items-center ">      
          <img
            src={movie?.image}
            alt={movie?.name}
            className="w-[25rem] h-[33rem] rounded"
          />
        </div>

        {/* description start */}
        <div className="flex-row">
            <div className="flex justify-evenly gap-[8rem]">
                  <section>
                    <h2 className="text-5xl font-extrabold">{movie?.name}</h2>
                    <p className="my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-[#B0B0B0]">
                      {movie?.detail}
                    </p>
                  </section>

                  <div>
                    <p className="text-2xl font-semibold">
                      Releasing Date: {movie?.year}
                    </p>

                    <div>
                      {movie?.cast?.map((c) => (
                        <ul key={c._id}>
                          <li className="mt-[1rem]">{c}</li>
                        </ul>
                      ))}
                    </div>
                  </div>
            </div>
            <div>
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
      

    
    </>
  )
}

export default MovieDetails;