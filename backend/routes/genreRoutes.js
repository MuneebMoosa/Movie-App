import express from "express"

const router = express.Router()

// controllers
import {createGenre , updateGenre} from '../controllers/genreController.js'
// middlewares
import { authenticate, authorizedAdmin} from "../middlewares/authMiddleware.js"
router.route('/').post(authenticate, authorizedAdmin, createGenre);
router.route('/:id').put(authenticate, authorizedAdmin, updateGenre);
export default router;