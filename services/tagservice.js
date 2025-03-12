import User from '../models/user.js';
import Temp from '../models/tempProfile.js';
import Tag from '../models/tag.js';
import Cluster from '../models/cluster.js';


const matchUserBasedonTags = async() => {
  console.log('match user based on tags')
};

const toggleVisibleTags = async() => {
  console.log('toggle what tags are visible to connections')
};

const tagCategorisation = async() => {
  console.log('add tag to a category')
};

export {
  matchUserBasedonTags,
  toggleVisibleTags,
  tagCategorisation
}
