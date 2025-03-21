import Tag from "../models/tag.js";
import TagRelationship from "../models/tagRelationship.js";
import { getTagswithChildren, searchTags } from "../services/tagSelection.js";


/**
 * get tags and their children (if available) in the provided category
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getTagsCategory = async(req, res) => {
  const {category} = req.query;
  const validCategories = ['hobbies', 'interests', 'politics', 'sexuality', 'values'];

  try{

    if(!category){
      return res.status(400).json({
        success: false,
        message: 'category is missing'
      });
    };

    if (!validCategories.includes(category)){
      return res.status(404).json({
        success: false,
        message: `category should be one of ${validCategories}`
      });
    };

    const result = await getTagswithChildren(category);
    return res.status(200).json({
      success: true,
      tags: result
    })

  }catch(error){
    return res.status(500).json({
      success: false,
      message: error.message
    });
  };
};

/**
 * search for tags before adding new tags if not found
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const searchForTags = async (req, res) => {
  const {searchTerm, category} = req.query;

  try{

    const foundTags = await searchTags(searchTerm, category);
    return res.status(200).json({
      success: true,
      message: `${foundTags.length} tags`,
      tags: foundTags.tags
    });

  }catch(error){
    return res.status(500).json({
      success: false,
      message: error.message
    });
  };
};

/**
 * suggest parent tags for a given category
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const suggestParentTag = async(req, res) => {
  const {category, tagName} = req.query;

  try{

    const keyword = tagName.toLowerCase().split(' ');
    const possibleParents = await Tag.find({
      category,
      tag: {$in: keyword.map(k => new RegExp(k, 'i'))},
    });

    return res.status(200).json({
      success: true,
      suggestedParentTags: possibleParents
    });

  }catch(error){
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export {
  getTagsCategory,
  searchForTags,
  suggestParentTag
}
