import mongoose from "mongoose";
import User from './user.js';
import Tag from './tag.js'
const Schema = mongoose.Schema;

const clusterSchema = new Schema({
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

const Cluster = mongoose.model('Cluster', clusterSchema);
export default Cluster;
