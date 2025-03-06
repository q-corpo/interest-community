import mongoose from "mongoose";
const Schema = mongoose.Schema;
import Tag from './tag.js'

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  hobbies : [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
  interests : [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
  values : [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
  sexuality : [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
  dob: Date,
  bio: String,


})
