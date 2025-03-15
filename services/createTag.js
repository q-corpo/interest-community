import User from '../models/user.js';
import Tag from '../models/tag.js';

/**
 * select the category for the tag
 * type in the tag you want to create
 * add to the tag category
 *  */ 

const createTag = async (tagData) => {
  try{
    const {category, tag} = tagData
    if(!tag){
      throw new Error('must include tag')
    }

    const validCategories = ['hobbies', 'interests', 'sexuality', 'values'];

    if(!validCategories.includes(category)){
      throw new Error('category does not exist')
    }

    const existingTag = await Tag.findOne({tag: tag.toLowerCase()})
    if(existingTag){
      return{
        success: false,
        message: 'tag already exists',
        tag: existingTag
      }
    }
    const newTag = new Tag(tagData)
    await newTag.save()
  }catch(error){
    return{
      success: false,
      error: error.message
    }
  }
}

const createTags = async(tagDatas) => {
  try{
    for(const tagData of tagDatas){
      const {category, tag} = tagData
    }
    if(!tag){
      throw new Error('you have not inputted any tag')
    }

    const validCategories = ['hobbies', 'interests', 'sexuality', 'values']
    if(!validCategories.includes(category)){
      throw new Error(`invalid category for ${tag}`)
    }

    const manyTags = await Tag.insertMany(tagDatas, {ordered: false});
    return {
      success: true,
      message: `${manyTags.length}, created successfully`,
      tags: manyTags
    }

  }catch(error){
    if (error.code === 11000){
      return{
        success: false,
        error: 'some tags already exist',
        details: error.writeErrors
      }
    }
    return {
      success: false,
      error: error.message
    };
  }
};

export {
  createTag,
  createTags
};
