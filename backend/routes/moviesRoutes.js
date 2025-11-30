import express from "express";

const router = express.Router()


// controllers
import {
  createMovie

} from '../controllers/movieController.js'
// middlewares
import { authenticate, authorizedAdmin} from "../middlewares/authMiddleware.js"
import checkId from "../middlewares/checkId.js";

// public Routes
// router.get('all-movies', getAllmovies)

// Restricted Routes
// Admin
router.post('/create-movie', authenticate, authorizedAdmin, createMovie)
export default router;