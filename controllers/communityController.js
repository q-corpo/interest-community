import Community from '../models/community.js';
import User from '../models/user.js';
import Temp from '../models/tempProfile.js';
import Tag from '../models/tag.js';
import { createTag, createTags } from '../services/createTag.js';


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

// view your communities
const seeCommunities = async(req, res) => {
  res.send('communities that match user interests and other criteria')
};

const joinCommunity = async(req, res)=> {
  res.send('join a suggested community')
};

const leaveCommunity = async(req, res)=> {
  res.send('leave a community')
}

export {
  createCommunity,
  seeCommunities,
  joinCommunity,
  leaveCommunity
}
