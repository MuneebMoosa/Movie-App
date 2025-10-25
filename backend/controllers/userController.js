import User from "../models/user.js";
import bcrypt from "bcryptjs";
import asyncHandler from "../middlewares/asnycHandler.js";
import createToken from "../utils/createToken.js"


const createUser = asyncHandler(async (req,res) => {
  const {username, email, password} = req.body;

  if(!username || !email || !password){
    throw new error("please fill the blanks");
  }

  const userExist = await User.findOne({email})
  if(userExist) res.status(400).send("user already exist");

  // hash the user password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({ username , email , password: hashedPassword })

  try{
      await newUser.save();
      createToken(res , newUser._id)
      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      });
  } catch(error){
    res.status(400)
    throw new error("invalid user data")
  }

});

export {createUser};