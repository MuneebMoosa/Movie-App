import { useState } from "react"
import {useCreateGenreMutation,
  useUpdateGenreMutation,
  useRemoveGenreMutation,
  useFetchGenreQuery
} from  '../../redux/api/genre.js'
import { toast } from "react-toastify"
import GenreForm from "../../comonents/GenreForm.jsx"
import Model from "../../comonents/Model.jsx"
const GenreList = () => {
  const {data: genres, refetch} = useFetchGenreQuery();
  const [name, setName] = useState('')
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [updatingName, setUpdatingName] = useState('')
  const [modelVisible, setModelVisible] = useState(false)


  const [createGenre] = useCreateGenreMutation()
  const [updateGenre] = useUpdateGenreMutation()
  const [deleteGenre] = useRemoveGenreMutation()

  const handleCreateGenre = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Genre name is required");
      return;
    }

    try {
      const result = await createGenre({ name }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created.`);
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating genre failed, try again.");
    }
  };

  const handleUpdateGenre = async (e) => {
     e.preventDefault();

    if (!updateGenre) {
      toast.error("Genre name is required");
      return;
    }

    try {
      const result = await updateGenre({
        id: selectedGenre._id,
        updateGenre: {
          name: updatingName,
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated`);
        refetch();
        setSelectedGenre(null);
        setUpdatingName("");
        setModelVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

 const handleDeleteGenre = async () => {
    try {
      const result = await deleteGenre(selectedGenre._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted.`);
        refetch();
        setSelectedGenre(null);
        setModelVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Genre deletion failed. Tray again.");
    }
 };


  return (
  <div className=" text-white px-6 py-10">
    <div className="max-w-6xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl p-8">

      <GenreForm
        value={name}
        setValue={setName}
        handleSubmit={handleCreateGenre}
      />

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-teal-400 mb-6">
          Available Genres
        </h2>

        <div className="flex flex-wrap gap-4">
          {genres?.map((genre) => (
            <button
              key={genre._id}
              className="px-5 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white font-medium hover:bg-teal-500 hover:border-teal-500 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20"
              onClick={() => {
                setModelVisible(true);
                setSelectedGenre(genre);
                setUpdatingName(genre.name);
              }}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>

      <Model
        isOpen={modelVisible}
        onClose={() => setModelVisible(false)}
      >
        <GenreForm
          value={updatingName}
          setValue={(value) => setUpdatingName(value)}
          handleSubmit={handleUpdateGenre}
          buttonText="Update"
          handleDelete={handleDeleteGenre}
        />
      </Model>

    </div>
  </div>
);
}

export default GenreList