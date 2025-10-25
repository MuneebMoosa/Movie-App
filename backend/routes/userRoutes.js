import express from "express";

// controllers
import { 
  createUser , 
  loginUser , 
  logoutCurrentUser, 
  getAllusers , 
  getCurrentUserProfile , 
  updateCurrentUserProfile} 
from "../controllers/userController.js";

//middlewares
import {authenticate , authorizedAdmin} from "../middlewares/authMiddleware.js"


const router = express.Router()

router.route("/").post(createUser).get(authenticate, authorizedAdmin, getAllusers);


router.post('/auth', loginUser);
router.post('/logout', logoutCurrentUser);

router.route("/profile").get(authenticate, getCurrentUserProfile).put(authenticate, updateCurrentUserProfile);
export default router;