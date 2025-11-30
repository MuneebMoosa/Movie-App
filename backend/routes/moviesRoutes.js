import express from "express";

const router = express.Router()


// controllers
import {
  createMovie,
  getAllmovies,
  getSpecificMovie,
  updateMovie,
  movieReview,
  deleteMovie
} from '../controllers/movieController.js'
// middlewares
import { authenticate, authorizedAdmin} from "../middlewares/authMiddleware.js"
import checkId from "../middlewares/checkId.js";

// public Routes
router.get('/all-movies', getAllmovies)
router.get('/specific-movie/:id', getSpecificMovie)
// Restricted Routes
router.post('/:id/reviews', authenticate, checkId, movieReview)
// Admin
router.post('/create-movie', authenticate, authorizedAdmin, createMovie)
router.put('/update-movie/:id', authenticate, authorizedAdmin, updateMovie)
router.delete('/delete-movie/:id', authenticate, authorizedAdmin, deleteMovie)
export default router;