import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router"
import {
    useGetSpecificMovieQuery,
    useUpdateMovieMutation,
    useUploadImageMutation,
    useDeleteMovieMutation
} from "../../redux/api/movie"
import { toast } from "react-toastify"
import { LuUpload } from "react-icons/lu";



const UpdateMovie = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    name: "",
    year: 0,
    detail: "",
    cast: [],
    ratings: 0,
    image: null,
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const { data: initialMovieData } = useGetSpecificMovieQuery(id);

  useEffect(() => {
    if (initialMovieData) {
      setMovieData(initialMovieData);
    }
  }, [initialMovieData]);

  const [updateMovie, { isLoading: isUpdatingMovie }] =
    useUpdateMovieMutation();

  const [
    uploadImage,
    { isLoading: isUploadingImage, error: uploadImageErrorDetails },
  ] = useUploadImageMutation();

  const [deleteMovie] = useDeleteMovieMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleUpdateMovie = async () => {
    try {
      if (
        !movieData.name ||
        !movieData.year ||
        !movieData.detail ||
        !movieData.cast
      ) {
        toast.error("Please fill in all required fields");
        return;
      }

      let uploadedImagePath = movieData.image;

      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const uploadImageResponse = await uploadImage(formData);

        if (uploadImageResponse.data) {
          uploadedImagePath = uploadImageResponse.data.image;
        } else {
          console.error("Failed to upload image:", uploadImageErrorDetails);
          toast.error("Failed to upload image");
          return;
        }
      }

      await updateMovie({
        id: id,
        updatedMovie: {
          ...movieData,
          image: uploadedImagePath,
        },
      }).unwrap()
      toast.success("Movie Updated successfully");
      navigate("/admin/movie-list");
    } catch (error) {
      console.error("Failed to update movie:", error);
    }
  };

  const handleDeleteMovie = async () => {
    try {
      toast.success("Movie deleted successfully");
      await deleteMovie(id);
      navigate("/movies");
    } catch (error) {
      console.error("Failed to delete movie:", error);
      toast.error(`Failed to delete movie: ${error?.message}`);
    }
  };






  
  return (
  <div className=" text-white py-10 px-4">
    <div className="max-w-4xl mx-auto bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-800 overflow-hidden">
      {/* Header */}
      <div className="border-b border-zinc-800 px-8 py-6">
        <h1 className="text-3xl font-bold text-teal-400">
          Update Movie
        </h1>
        <p className="text-gray-400 mt-1">
          Edit the movie information and save your changes.
        </p>
      </div>

      <form className="p-8 space-y-6">

        <div className="grid md:grid-cols-2 gap-6">

          {/* Name */}
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

          {/* Year */}
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
              <span className="text-sm flex items-center gap-2">
                 <LuUpload size={20}/> <p>Click here to upload an image</p>
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

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">

          <button
            type="button"
            onClick={handleUpdateMovie}
            disabled={isUpdatingMovie || isUploadingImage}
            className="flex-1 rounded-lg bg-teal-500 hover:bg-teal-600 disabled:opacity-60 px-6 py-3 font-semibold transition"
          >
            {isUpdatingMovie || isUploadingImage
              ? "Updating..."
              : "Update Movie"}
          </button>

          <button
            type="button"
            onClick={handleDeleteMovie}
            disabled={isUpdatingMovie || isUploadingImage}
            className="flex-1 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-60 px-6 py-3 font-semibold transition"
          >
            {isUpdatingMovie || isUploadingImage
              ? "Deleting..."
              : "Delete Movie"}
          </button>

        </div>

      </form>
    </div>
  </div>
);
}

export default UpdateMovie