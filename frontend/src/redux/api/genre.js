import {apiSlice} from './apiSlice.js'
import { GENRE_URL } from '../constants.js'
import { listGenre } from '../../../../backend/controllers/genreController.js'


export const genreApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createGenre: builder.mutation({
      query: (newGenre) => ({
        url: `${GENRE_URL}`,
        method: "POST",
        body: newGenre
      })
    }),
     updateGenre: builder.mutation({
      query: ({id,updateGenre}) => ({
        url: `${GENRE_URL}/${id}`,
        method: "PUT",
        body: updateGenre
      })
    }),
    removeGenre: builder.mutation({
    query: (id) => ({
      url: `${GENRE_URL}/${id}`,
      method: "DELETE",
    })
  }),
    fetchGenre: builder.query({
      query: () => ({
        url: `${GENRE_URL}/genres`,
      })
    }),
    readGenre: builder.query({
      query: (id) => ({
        url: `${GENRE_URL}`/`${id}`,
      })
    }),
  })
})

export const {
    useCreateGenreMutation, 
    useUpdateGenreMutation,
    useRemoveGenreMutation,
    useFetchGenreQuery,
    useReadGenreQuery} = genreApiSlice;