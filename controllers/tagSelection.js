import Tag from "../models/tag";
import TagRelationship from "../models/tagRelationship";
import { getTagswithChildren, searchTags } from "../services/tagSelection";


/**
 * get tags and their children (if available) by provided category
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getTagsCategory = async(req, res) => {
  const {category} = req.params;
  const validCategories = ['hobbies', 'interests', 'sexuality', 'values'];

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


const searchForTags = async (req, res) => {
  const {searchTerm} = req.params;
  const {category} = req.query;

  try{

    const foundTags = await searchTags(category, searchTerm);
    return res.status(200).json({
      success: true,
      message: `${foundTags.length} tags`,
      tags: result
    });

  }catch(error){
    return res.status(500).json({
      success: false,
      message: error.message
    });
  };
};


const suggestParentTag = async(req, res) => {
  const {category, tagName} = req.body;

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
