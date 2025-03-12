import User from '../models/user.js';
import Temp from '../models/tempProfile.js';
import Tag from '../models/tag.js';


const addTag = async(req, res) => {
  res.send('add tag to a user tag categories')
};

const removeTag = async(req, res)=> {
  res.send('remove tags from tag list on user profile')
}


export {
  addTag,
  removeTag
}
