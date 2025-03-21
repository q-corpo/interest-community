import express from 'express';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import readRoutes from './routes/userRoutes/read.js';
import writeRoutes from './routes/userRoutes/write.js';
import indexRoutes from './routes/appRoutes/index.js'
dotenv.config()
const app = express();

console.log('passing through app.js')
// mount middleware
app.use(express.json());
app.use('/user', readRoutes);
app.use('/user', writeRoutes);
app.use('/', indexRoutes);


export default app;
