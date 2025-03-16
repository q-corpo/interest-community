import mongoose from "mongoose";
import User from './user.js';
import Tag from './tag.js'
const Schema = mongoose.Schema;

const communitySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  desc:{
    type: String,
    required: true
  },
  tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag', required: true}],
  members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User', required : true}],
  creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required : true},
  createdDate: {
    type: Date,
    default: Date.now
  }
})

const Community = mongoose.model('Community', communitySchema);
export default Community;
