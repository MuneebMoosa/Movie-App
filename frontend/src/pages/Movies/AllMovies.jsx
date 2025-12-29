import { useFetchGenreQuery } from "../../redux/api/genre"
import { useGetAllMoviesQuery, 
          useGetNewMoviesQuery,
          useGetRandomMoviesQuery, 
          useGetTopMoviesQuery } from "../../redux/api/movie"
import MovieCard from "./MovieCard"
import { useEffect } from "react"
import { useSelector,useDispatch } from "react-redux"
import banner from "../../assests/banner.jpg"

import {
    setMoviesFilter,
  setFilteredMovies,
  setMovieYears,
  setUniqueYears,
}from '../../redux/features/movies/movieSlice'

const AllMovies = () => {
  return (
    <div>AllMovies</div>
  )
}

export default AllMovies