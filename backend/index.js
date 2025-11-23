import express from "express";
import CookieParser from "cookie-parser";
import dotenv  from "dotenv";
import path from "path";

// files

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"
import genreRoutes from "./routes/genreRoutes.js"
// configuration

dotenv.config()
connectDB()

const app = express()

// middlewares

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(CookieParser())

const PORT = process.env.PORT || 3000;

// Routes

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/genre', genreRoutes);
app.listen(PORT , () => {
 
  console.log(`server is listening on port ${PORT}`);
  
})