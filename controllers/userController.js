import User from '../models/user.js';
import Temp from '../models/tempProfile.js';
import Tag from '../models/tag.js';
import { matchUserBasedonTags } from '../services/userMatching.js';


/*

edit user profile

 */ 
const editUserProfile = async(req, res) => {
  const {userId} = req.params;
  const {userName, bio, location} = req.body;

  try{
    if(!userId){
      return res.status(400).json({
        success: false,
        message: 'user id required'
      })
    }

    if(!userName && !bio && !location){
      return res.status(400).json({
        success: false,
        message: 'missing parameters for editing profile'
      });
    };

    let updateObject = {}
    if (userName) updateObject.userName = userName;
    if (bio) updateObject.bio = bio;
    if (location) updateObject.location = location;

    const editUser = await User.findByIdAndUpdate(userId, updateObject, {new: true});

    if (!editUser){
      return res.status(404).json({
        success: false,
        message: 'user does not exist'
      });
    };

    return res.status(200).json({
      success: true,
      userProfile: editUser
    });


  }catch(error){
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



/*
view user profile
 */ 
const viewUserProfile = async(req, res) => {
  const{userId} = req.params;

  try{
    if(!userId){
      return res.status(404).json({
        success: false,
        message: 'user id required'
      })
    };

    const userProfile = await User.findById(userId)
    .populate('hobbies.tags')
    .populate('interests.tags')
    .populate('sexuality.tags')
    .populate('values.tags')

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


/*
find connections based on tags and visibility options
 */ 
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
      conn.toString() === connectId.toString());

    if(!isAlreadyConnected){
      thisUser.userConnections.push(connectId);
      connectionAdded = true;
      await thisUser.save();
    }

    return res.status(200).json({
      success: true,
      potentialMatches: matchingConnections,
      count: matchingConnections.length,
      connectionAdded: connectionAdded,
      connectId: connectId || null
    });

    
  } catch(error){
    return res.status(500).json({
      success: false,
      message: error.message || 'an error occured while handling connection requests'
    });
  }
};



/*
remove connections from user connections list
 */ 
const removeConnection = async(req, res) => {
  const {connectionId} = req.body;
  const {userId} = req.params;

  try {

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'user id required'
      });
    };

    if (!connectionId || connectionId.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'connectionId required to remove connection'
      });
    };

    const thisUser = await User.findById(userId);

    if(!thisUser){
      return res.status(404).json({
        success: false,
        message: 'user does not exist'
      });
    };

    const connectionExist = thisUser.userConnections.some(connection => connection.toString() == connectionId.toString())
    if(!connectionExist){
      return res.status(404).json({
        success: false,
        message: 'connection does not exist'
      });
    };

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {$pull: {userConnections: connectionId}},
      {new: true},
    )

    return res.status(200).json({
      success: true,
      message: 'connection removed successfully',
      connections: updatedUser.userConnections
    });

  }catch(error){
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }

};



export  {
  editUserProfile,
  viewUserProfile,
  seeConnections,
  addConnection,
  removeConnection,
}

