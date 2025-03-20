import mongoose from "mongoose";
const Schema = mongoose.Schema;

const tagSchema = new Schema({
  category: {
    type: String,
    enum: ['hobbies', 'interests', 'politics', 'sexuality', 'values'],
    index: true
  },
  tag: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  }
})

const Tag = mongoose.model('Tag', tagSchema);

export default Tag;
