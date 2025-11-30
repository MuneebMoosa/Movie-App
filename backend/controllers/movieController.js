import Movie from '../models/movie.js'

const createMovie = async(req, res) => {
  try {
    const newMovie = new Movie(req.body)
    const savedMovie = await newMovie.save()
    res.json(savedMovie)
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

export {createMovie};