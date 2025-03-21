import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './src/app.js';
import { initialiseBaseCategories } from './src/scripts/initCategories.js';
// import { initUser } from './src/scripts/initUser.js';
dotenv.config();
const PORT = process.env.PORT;


// startup mongo db
const uri = process.env.MONGO_URI;

const connect_db = async () => {
  try {
    console.log('connecting to db');
    await mongoose.connect(uri);
    await initialiseBaseCategories();
    // await verifyCategories();
    // await initUser();
    console.log('db connected and base categories initialised');
  }catch(error){
    console.log(error);
    process.exit(1);
  }
}
connect_db();


app.listen(PORT, (req, res)=> {
  console.log(`server is running at port: ${PORT}`);
})
