import User from '../models/user.js';
import Temp from '../models/tempProfile.js';
import Tag from '../models/tag.js';
import { matchUserBasedonTags } from '../services/userMatching.js';


const editUserProfile = async(req, res) => {
  res.send('edit the user profile')
};

const viewUserProfile = async(req, res) => {
  res.send('view user profile as it appears to potential connections when you fill in your information, potential connections too see the same thing')
}

const createConnection = async(req, res) => {
  res.send('create connection to find people based on select tags')
};

const seeConnections = async(req, res) => {
  res.send('see various human connections found based on tags')
};

const addConnection = async(req, res) => {
  res.send('add user connection from connection list')
};

const removeConnection = async(req, res) => {
  res.send('remove a connection from connection list')
}

const toggleTemp = async(req, res)=> {
  res.send('activate or deactivate temp profile')
};



export  {
  editUserProfile,
  viewUserProfile,
  createConnection,
  seeConnections,
  addConnection,
  removeConnection,
  toggleTemp
}

