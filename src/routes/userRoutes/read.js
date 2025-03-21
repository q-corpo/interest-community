import express from 'express';
import { findConnections, viewUserProfile } from '../../controllers/userController.js';
import { getTagsCategory, searchForTags } from '../../controllers/tagSelection.js';
import { seePotentialCommunities, seeUserCommunities } from '../../controllers/communityController.js';
const router = express.Router();

/**
 * user routes for read operations
 */



// view user profile
router.get('/:userId/profile', viewUserProfile);

// find connections based on tags and visibility options
router.get('/:userId/connections/people', findConnections);

// view tags and parent relationships if available
router.get('/tags', getTagsCategory);

// search for tags (prevent duplicate) *not working
router.get('/tags', searchForTags)

// see communities that match user's selected tags
router.get('/:userId/connections/communities', seePotentialCommunities);

// view the communities user is part of
router.get('/:userId/commnunities', seeUserCommunities)

export default router;
