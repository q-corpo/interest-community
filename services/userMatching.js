import User from '../models/user.js';
import Temp from '../models/tempProfile.js';
import Tag from '../models/tag.js';
import Cluster from '../models/cluster.js';


const matchUserBasedonTags = async(userId, tagIds, categories=['hobbies', 'interests','sexuality', 'values'], limit = 20) => {
  if(!userId || !tagIds || !Array.isArray(tagIds) || tagIds.length === 0){
    throw new Error('invalid matching parameters')
  }
  const conditions = [];

  if (categories.includes('hobbies')){
    conditions.push({
      'hobbies.tags': {$in: tagIds},
      'hobbies.visibility': true,
      'allowHobbiesConnection': true
    })
  }

  if (categories.includes('interests')){
    conditions.push({
      'hobbies.tags': {$in: tagIds},
      'hobbies.visibility': true,
      'allowHobbiesConnection': true
    })
  }

  if (categories.includes('sexuality')){
    conditions.push({
      'hobbies.tags': {$in: tagIds},
      'hobbies.visibility': true,
      'allowHobbiesConnection': true
    })
  }

  if (categories.includes('values')){
    conditions.push({
      'hobbies.tags': {$in: tagIds},
      'hobbies.visibility': true,
      'allowHobbiesConnection': true
    })
  }

  const matchingUsers = User.find({
    _id: {$ne: userId},
    $or: conditions 
  })
  .select({username: 1, bio: 1, location: 1, hobbies: 1, interests: 1, sexuality: 1, values: 1})
  .limit(limit)

  const matchUserCount = (await matchingUsers).map(user => {
    const matchCount = 0

    ['hobbies', 'interests', 'sexuality', 'values'].forEach(category =>{
      if(user[category] && user[category],visibility){
        const userTagIds = user[category].tags.map(tag => tag.toString());
        const matches = tagIds.filter(tagId => userTagIds.includes(tagId));
        matchCount += matches.length;
      }
    })

    return{
      user: user,
      matchCount: matchCount,
    }
  })

  matchUserCount.sort((a, b)=> b.matchCount - a.matchCount);

  return matchUserCount;


};



export {matchUserBasedonTags} ;
