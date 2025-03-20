import express from 'express';
import dotenv from 'dotenv';
import mongoose from "mongoose";
dotenv.config()
const app = express();
app.use(express.json());
const PORT = process.env.PORT;
const uri = process.env.MONGO_URI;

const connect_db = async () => {
  try {
    await mongoose.connect(uri).then(() => {
      console.log('db connected');
    })
  }catch(error){
    console.log(error);
  }
}
connect_db();



export default app;
