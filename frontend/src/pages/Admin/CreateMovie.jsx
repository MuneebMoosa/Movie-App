import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useCreateMovieMutation , useUploadImageMutation} from '../../redux/api/movie'
import { useFetchGenreQuery } from '../../redux/api/genre'
import { toast } from 'react-toastify'

const CreateMovie = () => {
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    name: "",
    year: 0,
    detail: "",
    cast: [],
    rating: 0,
    image: null,
    genre: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const [
    createMovie,
    { isLoading: isCreatingMovie, error: createMovieErrorDetail },
  ] = useCreateMovieMutation();

  const [
    uploadImage,
    { isLoading: isUploadingImage, error: uploadImageErrorDetails },
  ] = useUploadImageMutation();

  const { data: genres, isLoading: isLoadingGenres } = useFetchGenreQuery();

  useEffect(() => {
    if (genres) {
      setMovieData((prevData) => ({
        ...prevData,
        genre: genres[0]?._id || "",
      }));
      console.log(genres[0]?._id);
    }
  }, [genres]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "genre") {
      const selectedGenre = genres.find((genre) => genre._id === value);

      setMovieData((prevData) => ({
        ...prevData,
        genre: selectedGenre ? selectedGenre._id : "",
      }));
    } else {
      setMovieData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleCreateMovie = async () => {
    try {
      if (
        !movieData.name ||
        !movieData.year ||
        !movieData.detail ||
        !movieData.cast ||
        !selectedImage
      ) {
        toast.error("Please fill all required fields");
        return;
      }

      let uploadedImagePath = null;

      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const uploadImageResponse = await uploadImage(formData);

        if (uploadImageResponse.data) {
          uploadedImagePath = uploadImageResponse.data.image;
        } else {
          console.error("Failed to upload image: ", uploadImageErrorDetails);
          toast.error("Failed to upload image");
          return;
        }

        await createMovie({
          ...movieData,
          image: uploadedImagePath,
        });

        navigate("/admin/movie-list");

        setMovieData({
          name: "",
          year: 0,
          detail: "",
          cast: [],
          ratings: 0,
          image: null,
          genre: "",
        });

        toast.success("Movie Added To Database");
      }
    } catch{
      console.error("Failed to create movie: ", createMovieErrorDetail);
      toast.error(`Failed to create movie: ${createMovieErrorDetail?.message}`);
    }
  };

 return (
  <div className="text-white py-10 px-4">
    <div className="max-w-4xl mx-auto bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-800 overflow-hidden">
      {/* Header */}
      <div className="border-b border-zinc-800 px-8 py-6">
        <h1 className="text-3xl font-bold text-teal-400">
          Create Movie
        </h1>
        <p className="text-gray-400 mt-1">
          Add a new movie to your collection.
        </p>
      </div>

      <form className="p-8 space-y-6">
        {/* Name & Year */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Movie Name
            </label>

            <input
              type="text"
              name="name"
              value={movieData.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-teal-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Release Year
            </label>

            <input
              type="number"
              name="year"
              value={movieData.year}
              onChange={handleChange}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-teal-500 transition"
            />
          </div>
        </div>

        {/* Detail */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Movie Description
          </label>

          <textarea
            rows={6}
            name="detail"
            value={movieData.detail}
            onChange={handleChange}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none resize-none focus:border-teal-500 transition"
          />
        </div>

        {/* Cast */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Cast
          </label>

          <input
            type="text"
            name="cast"
            value={movieData.cast.join(", ")}
            onChange={(e) =>
              setMovieData({
                ...movieData,
                cast: e.target.value.split(", "),
              })
            }
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-teal-500 transition"
          />

          <p className="text-xs text-gray-500 mt-2">
            Separate actor names with commas.
          </p>
        </div>

        {/* Genre */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Genre
          </label>

          {isLoadingGenres ? (
            <p className="text-gray-400">Loading genres...</p>
          ) : (
            <select
              name="genre"
              value={movieData.genre}
              onChange={handleChange}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-teal-500 transition"
            >
              <option value="">Select Genre</option>

              {genres.map((genre) => (
                <option key={genre._id} value={genre._id}>
                  {genre.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Movie Poster
          </label>

          <label
            style={
              !selectedImage
                ? {
                    border: "2px dashed #3f3f46",
                    borderRadius: "12px",
                    padding: "30px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    color: "#a1a1aa",
                    background: "#09090b",
                  }
                : {}
            }
          >
            {!selectedImage && (
              <span className="text-sm">
                Click here to upload an image
              </span>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{
                display: !selectedImage ? "none" : "block",
              }}
            />
          </label>

          {selectedImage && (
            <p className="text-sm text-teal-400 mt-3">
              Selected: {selectedImage.name}
            </p>
          )}
        </div>

        {/* Button */}
        <div className="pt-4">
          <button
            type="button"
            onClick={handleCreateMovie}
            disabled={isCreatingMovie || isUploadingImage}
            className="w-full rounded-lg bg-teal-500 hover:bg-teal-600 disabled:opacity-60 px-6 py-3 font-semibold transition"
          >
            {isCreatingMovie || isUploadingImage
              ? "Creating..."
              : "Create Movie"}
          </button>
        </div>
      </form>
    </div>
  </div>
);
};
export default CreateMovie;