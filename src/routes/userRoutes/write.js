import express from 'express';
import { addConnection, editUserProfile, removeConnection } from '../../controllers/userController.js';
import { suggestParentTag } from '../../controllers/tagSelection.js';
import { addTag, removeTag } from '../../controllers/tagController.js';
import { createCommunity, joinCommunity, leaveCommunity } from '../../controllers/communityController.js';
const router = express.Router();

/**
 * user routes for write operations
 */

// edit user profile
router.get('/:userId/profile', editUserProfile);

// add connection to user account
router.get('/:userId/connections', addConnection);

// remove connection from connection list
router.get('/:userId/connections', removeConnection);

// suggest parent tag for list of tags
router.get('/:userId/connections/tags', suggestParentTag);

// create and add tag to user's tags
router.get('/:userId/connections/tags', addTag);

// remove tag from taglist
router.get('/:userId/connections/tags', removeTag);

// create a community
router.get('/:userId/connections/communities', createCommunity);

// join communities
router.get('/:userId/connections/commnities', joinCommunity);

// leave community
router.get('/:userId/communities', leaveCommunity);


export default router;
