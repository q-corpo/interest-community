import express from 'express';
import { findConnections, viewUserProfile } from '../../controllers/userController';
import { getTagsCategory, searchForTags } from '../../controllers/tagSelection';
import { seePotentialCommunities, seeUserCommunities } from '../../controllers/communityController';
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

// search for tags (prevent duplicate)
router.get('/tags', searchForTags)

// see communities that match user's selected tags
router.get('/:userId/connections/communities', seePotentialCommunities);

// view the communities user is part of
router.get('/:userId/commnunities', seeUserCommunities)
