import User from '../models/user.js';
import Tag from '../models/tag.js';
import { createTag, createTags } from '../services/createTag.js';
import TagRelationship from '../models/tagRelationship.js';


/**
 * create and add tag to a user's list of tags
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const addTag = async(req, res) => {
  const {userId} = req.params;
  const {tagIds, category, parentTagId} = req.body;
  const validCategories = ['hobbies', 'interests', 'politics', 'sexuality', 'values'];

  try{

    if(!userId || userId.length === 0){
      return res.status(400).json({
        success: false,
        message: 'user id required'
      });
    };

    if(!tagIds || !Array.isArray(tagIds) || tagIds.length === 0){
      return res.status(400).json({
        success: false,
        message: 'missing tag parameters'
      });
    };
  
    if(!validCategories.includes(category)){
      return res.status(404).json({
        success: false,
        message: 'invalid category'
      });
    };

      // add tags to various categories
  const results = [] 
  for(const tagId of tagIds){
    const tagData = {
      tag: tagId,
      category: category
    }
    const result = await createTag(tagData);
    
    if(parentTagId && result.tag) {
      await TagRelationship.findOneAndUpdate(
        { parentTag: parentTagId, childTag: result.tag._id },
        { parentTag: parentTagId, childTag: result.tag._id },
        { upsert: true }
      );
    }
    results.push(result);
  };

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {$addToSet: {[category]: {$each: tagIds}}},
    {new: true}
  );

  return res.status(200).json({
    success: true,
    message: 'tag added successfully',
    user: updatedUser
   })

  }catch(error){
    return res.status(500).json({
      success: false,
      message: error.message
    });
  };
};


/**
 * remove tags from user profile
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */ 
const removeTag = async(req, res)=> {
  const {userId} = req.params;
  const {tagId, category} = req.body;
  const validCategories = ['hobbies', 'interests', 'politics', 'sexuality', 'values'];

  try{

  if(!userId || userId.length === 0){
    return res.status(400).json({
      success: false,
      message: 'user id required'
    });
  };

  if(!tagId || tagId.length === 0){
    return res.status(400).json({
      success: false,
      message: 'missing tag parameters'
    });
  };

  if(!validCategories.includes(category)){
    return res.status(404).json({
      success: false,
      message: 'invalid category'
    });
  };

  const thisUser = await User.findById(userId);
  if(!thisUser){
    return res.status(404).json({
      success: false,
      message: 'user not found'
    })
  }
  // check if tag is present
  const tagCategory = thisUser[category] || []
  const tagExist = tagCategory.some(tag => tag.toString() === tagId)

  if(!tagExist){
    return res.status(404).json({
      success: false,
      message: 'tag not found'
    });
  };

  const updateUserTags = await User.findByIdAndUpdate(
    userId,
    {$pull: {[category]: tagId}},
    {new: true}
  );

  return res.status(200).json({
    success: true,
    message: 'tag deleted successfully',
    user: updateUserTags
  });


  }catch(error){
    return res.status(500).json({
      success: false,
      message: error.message
    });
  };
};


export {
  addTag,
  removeTag
}
