import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    index: true
  },
  passwordHash: String,
  dob: Date,
  bio: String,
  location:{
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true }
  },  
  hobbies : {
    tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
    visibility: Boolean
  },
  interests : {
    tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
    visibility: Boolean
  },
  politics : {
    tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
    visibility: Boolean
  },
  sexuality : {
    tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
    visibility: Boolean
  },
  values : {
    tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
    visibility: Boolean
  },
  allowHobbiesConnection: {
    type: Boolean,
    default: true
  },
  allowInterestsConnection: {
    type: Boolean,
    default: true
  },
  allowPoliticsConnection: {
    type: Boolean,
    default: true
  },
  allowSexualityConnection: {
    type: Boolean,
    default: true
  },
  allowValuesConnection: {
    type: Boolean,
    default: true
  },
  userConnections: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  communityConnections: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'community'
  }]

})


const User = mongoose.model('User', userSchema);

export default User;
