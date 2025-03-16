import User from '../models/user.js';
import Temp from '../models/tempProfile.js';
import Tag from '../models/tag.js';
import { matchUserBasedonTags } from '../services/userMatching.js';


const editUserProfile = async(req, res) => {
  res.send('edit the user profile')
};
// view your profile
const viewUserProfile = async(req, res) => {
  const{userId} = req.body;

  try{
    if(!userId){
      return res.status(404).json({
        success: false,
        message: 'user id required'
      })
    };

    const userProfile = await User.findById(userId)
    .populate(hobbies.tags)
    .populate(interests.tags)
    .populate(sexuality.tags)
    .populate(values.tags)

    return res.status(200).json({
      success: true,
      profile: userProfile
    });

  }catch(error){
    return{
      success: false,
      message: error.message || 'could not find user with that id'
    };
  }
}

// finding connections based on tag criteria and visibility options
const seeConnections = async(req, res) => {
  try{
    const {userId, tagIds, categories, limit} = req.body
    // validate user input man
    if(!userId || !tagIds || !Array.isArray(tagIds) || !tagIds.length === 0){
      return res.status(400).json({
        success: false,
        message: 'some parameters are missing'
      })
    }

    // find matches
    const matchingConnections = await matchUserBasedonTags(
      userId,
      tagIds,
      categories || ['hobbies', 'interests', 'sexuality', 'values'],
      limit || 20
    )
    return res.status(200).json({
      success: true,
      matches: matchingConnections,
      count: matchingConnections.length
    })


  }catch(error){
    console.log('error finding connections', error.message)
    return res.status(500).json({
      success: false,
      message: error.message || 'could not find connections'
    })
  }
};


// user controller for adding connections
const addConnection = async(req, res) => {
  try{
    const {userId, tagIds, categories, connectId} = req.body;
    if(!userId || !tagIds || !Array.isArray(tagIds) || tagIds.length === 0){
      return res.status(400).json({
        success: false,
        message: 'missing required parameters'
      })
    }

    // verify the user that wants to add connections exist in the db
    const thisUser = await User.findById(userId);
    if(!thisUser){
      return res.send(400).json({
        success: false,
        message: 'could not find user'
      })
    }


    // find matches
    const matchingConnections = await matchUserBasedonTags(
      userId,
      tagIds,
      categories || ['hobbies', 'interests', 'sexuality', 'values'],
      limit || 20
    )

    // connect with potential matches that have been found

    let connectionAdded = false;
    if(connectId){
      if(!thisUser.userConnections){
        thisUser.userConnections = [];
      }
    }

    const isAlreadyConnected = thisUser.userConnections.some(conn => 
      conn.toString() === thisUser.userConnections.toString());

    if(!isAlreadyConnected){
      thisUser.userConnections.push(connectId);
      connectionAdded = true;
      await thisUser.save();
    }

    return res.send(200).json({
      success: true,
      potentialMatches: matchingConnections,
      count: matchingConnections.length,
      connectionAdded: connectionAdded,
      connectId: connectId || null
    });

    
  } catch(error){
    console.log('error handling connections')
  }
  return res.status(400).json({
    success: false,
    message: error.message || 'an error occured while handling connection requests'
  });
};



const removeConnection = async(req, res) => {
  res.send('remove a connection from connection list')
}

const toggleConnectionStatus = async(req, res)=> {
  res.send('activate or deactivate connection toggle')
};



export  {
  editUserProfile,
  viewUserProfile,
  createConnection,
  seeConnections,
  addConnection,
  removeConnection,
  toggleConnectionStatus
}

