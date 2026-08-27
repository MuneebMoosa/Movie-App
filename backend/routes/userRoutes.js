import express from "express";

// controller s
import { 
  createUser , 
  loginUser ,
  verifyEmail, 
  resendVerificationEmail, 
  refreshAccessToken,
  logoutCurrentUser, 
  getAllusers , 
  getCurrentUserProfile , 
  updateCurrentUserProfile,
  forgotPassword,
  resetPassword} 
from "../controllers/userController.js";
import {registerSchema , updateProfileSchema ,  forgotPasswordSchema, resetPasswordSchema} from "../validators/auth.validators.js";
import validate from "../middlewares/validate.middleware.js";

//middlewares
import {authenticate , authorizedAdmin} from "../middlewares/authMiddleware.js"


const router = express.Router()

router.route("/").post(validate(registerSchema) ,createUser).get(authenticate, authorizedAdmin, getAllusers);
router.post("/verify-email/:token", verifyEmail);
router.post("/resend-verification", resendVerificationEmail );
router.post("/refresh", refreshAccessToken);
router.post( "/forgot-password", validate(forgotPasswordSchema), forgotPassword );
router.post( "/reset-password/:token", validate(resetPasswordSchema), resetPassword );
router.post('/auth', loginUser);
router.post('/logout', logoutCurrentUser);

router.route("/profile").get(authenticate, getCurrentUserProfile).put( authenticate, validate(updateProfileSchema), updateCurrentUserProfile );
export default router;