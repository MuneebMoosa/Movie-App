import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import asyncHandler from "../middlewares/asnycHandler.js";
import createToken from "../utils/createToken.js"


const createUser = asyncHandler(async (req,res) => {
  const {username, email, password} = req.body;
  console.log(username);
  console.log(email);
  console.log(password);
  
});

export {createUser};