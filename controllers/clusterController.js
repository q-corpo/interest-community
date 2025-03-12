import Cluster from '../models/cluster.js';
import User from '../models/user.js';
import Temp from '../models/tempProfile.js';
import Tag from '../models/tag.js';


const createCluster = async(req, res)=> {
  res.send('create a cluster based on selected tags')
}

const seeClusters = async(req, res) => {
  res.send('clusters that match user interests and other criteria')
};

const joinCluster = async(req, res)=> {
  res.send('join a suggested cluster')
};

const leaveCluster = async(req, res)=> {
  res.send('leave a cluster')
}

export {
  createCluster,
  seeClusters,
  joinCluster,
  leaveCluster
}
