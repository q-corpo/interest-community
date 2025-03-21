import express from 'express';
import { getTagsCategory } from '../../controllers/tagSelection.js';
const router = express.Router();
router.use(express.json());

router.get('/', (req, res) => {
  res.send('<h1>welcome to the cluster broski</h1>')
  console.log('welcome to the cluster')
})

// get tags categories
// router.get('/tags', getTagsCategory)



export default router;
