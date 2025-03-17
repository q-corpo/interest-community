import Community from '../models/community.js';
import User from '../models/user.js';
import Temp from '../models/tempProfile.js';
import Tag from '../models/tag.js';
import { createTag, createTags } from '../services/createTag.js';

// const validateUserId = (userId) => {
//   if(!userId || userId.length === 0){
//     return {
//       valid: false,
//       message: 'user id required'
//     }
//   }
//   return {
//     valid: true,
//     message: 'user id received'
//   };
// };


/*
create a community
 */ 
const createCommunity = async(req, res)=> {

  const {userId} = req.params;
  const {name, desc, tagIds, category} = req.body;
  const validCategories = ['hobbies', 'interests', 'sexuality', 'values']

  try{

    if(!userId || userId.length === 0){
      return res.status(400).json({
        success: false,
        message: 'user id is required'
      });
    };

    if(!name || !desc || !tagIds || !Array.isArray(tagIds) || tagIds.length === 0){
      return res.status(400).json({
        success: false,
        message: 'missing parameters'
      });
    };

    if(!validCategories.includes(category)){
      return res.status(404).json({
        success: false,
        message: 'invalid category'
      });
    };

    const tags = [] 
    for(const tagId of tagIds){
      const tagData = {
        tag: tagId,
        category: category
    }
    const tag = await createTag(tagData);
    tags.push(tag)
  }

    const communityCreator = await User.findById(userId);

    if(!communityCreator){
      return res.status(404).json({
        success: false,
        message: 'user does not exist'
      });
    };

    const communityObject = {
      name: name,
      desc: desc,
      creator : communityCreator,
      tags: tags
    };

    const updatedUserCommunities = await User.findByIdAndUpdate(
      userId,
      {$push: {communityConnections: communityObject}},
      {new: true}
    );

    return res.status(201).json({
      success: true,
      communities: updatedUserCommunities,
      message: 'community successfully created'
    })

  }catch(error){
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


/*
see communities that match your needs, interests, etc.
 */ 
const seePotentialCommunities = async (req, res) => {
  const {userId} = req.params;
  const {tagIds, category} = req.body;
  const validCategories = ['hobbies', 'interests', 'sexuality', 'values']

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
        message: 'tags are required'
      });
    };

    if (category && !validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: `category must be one of: ${validCategories.join(', ')}`
      });
    }

    const thisUser = await User.findById(userId);
    if(!thisUser){
      return res.status(404).json({
        success: false,
        message: 'user does not exist'
      });
    };

    const query = {tags: {$in: tagIds}};
    const matchingCommunities = await Community.find(query);

    // ignore communities the user is already part of;
    const userCommunities = thisUser.communityConnections.map(id => id.toString());
    const newCommunities = matchingCommunities.filter(community => userCommunities.includes(community._id.toString()))

    // return the filtered communities
    return res.status(200).json({
      success: true,
      message: `found ${newCommunities.length}`,
      communities: newCommunities
    })

  }catch(error){
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

/*
view your communities
 */ 
const seeUserCommunities = async (req, res) => {
  const {userId} = req.params;

  try {

    if(!userId || userId.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'userId required'
      });
    };

    const communityOwner = await User.findById(userId);

    if(!communityOwner){
      return res.status(404).json({
        success: false,
        message: 'user not found'
      });
    };

    const userCommunities = await communityOwner.communityConnections;

    return res.status(200).json({
      success: true,
      message: `found ${userCommunities.length}, communities`,
      communities: userCommunities
    })

  }catch(error){
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
};

const joinCommunity = async(req, res)=> {
  res.send('join a suggested community')
};

const leaveCommunity = async(req, res)=> {
  res.send('leave a community')
}

export {
  createCommunity,
  seeUserCommunities,
  seePotentialCommunities,
  joinCommunity,
  leaveCommunity
}
