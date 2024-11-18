import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import route from "./routes/userRoutes.js";
import cors from 'cors';


const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 7000;
const MONGO_URL = process.env.MONGO_URI; 

mongoose
  .connect(MONGO_URL) 
  .then(() => {
    console.log("DB Connected Successfully");
    app.listen(PORT, () => {
      console.log(`Server Is Running On Port : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to database:", error);
  });


  app.use('/api',route)