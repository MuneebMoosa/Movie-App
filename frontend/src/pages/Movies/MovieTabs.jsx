import { Link } from "react-router-dom";

const MovieTabs = ({ userInfo, submitHandler, comment, setComment, movie }) => {
  return (
    <div className="space-y-8">
      {/* Review Form Section */}
      <section className="bg-surface/50 border border-border p-5 rounded-2xl max-w-2xl">
        {userInfo ? (
          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label htmlFor="comment" className="block text-lg font-bold text-text-primary mb-2">
                Write Your Review
              </label>

              <textarea
                id="comment"
                rows="3"
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts about this movie..."
                className="w-full p-3 bg-surface-light border border-border rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary transition-colors text-sm"
              ></textarea>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white font-medium text-sm rounded-xl transition-all duration-200 shadow-md shadow-primary/20"
            >
              Submit Review
            </button>
          </form>
        ) : (
          <p className="text-text-secondary text-sm">
            Please{" "}
            <Link to="/login" className="text-primary hover:underline font-semibold">
              Sign In
            </Link>{" "}
            to write a review
          </p>
        )}
      </section>

      {/* Reviews List Section */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-text-primary">Reviews ({movie?.reviews?.length || 0})</h3>

        {(!movie?.reviews || movie.reviews.length === 0) ? (
          <div className="p-6 bg-surface/30 border border-border/60 rounded-xl text-text-secondary text-sm text-center max-w-2xl">
            No reviews yet. Be the first to share your thoughts!
          </div>
        ) : (
          <div className="space-y-4 max-w-2xl">
            {movie.reviews.map((review) => (
              <div
                key={review._id}
                className="bg-surface border border-border p-4 rounded-xl space-y-2 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <strong className="text-text-primary text-sm font-semibold">{review.name}</strong>
                  <span className="text-xs text-text-secondary font-medium">
                    {review.createdAt?.substring(0, 10)}
                  </span>
                </div>

                <p className="text-text-secondary text-sm leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default MovieTabs;