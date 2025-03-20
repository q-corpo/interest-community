import Tag from '../models/tag';
import TagRelationship from '../models/tagRelationship';

/**
 * get list of tags and return results by relationships
 * @param {*} category 
 * @returns 
 */
const getTagswithChildren = async (category)=> {

  try{

    const tags = await Tag.find({category});

    const result = [];
  
    for(const tag of tags){
      const children = await TagRelationship.find({parentTag: tag._id}).populate('childTag');
      result.push({
        tag: tag,
        children: children.map(c => c.childTag)
      });
    };

    return{
      success: true,
      tags: result
    }


  }catch(error){
    return {
      success: false,
      message: error.message
    }
  }
};

/**
 * find a tag by typing
 * @param {*} seachTerm 
 * @param {*} category 
 */
const searchTags = async (searchTerm, category=null) => {
  try{
    
    const query = {$regex: searchTerm, $options: 'i'};
    if(category){
      query.category = category;
    }
    const tags = await Tag.find(query).limit(10);
    return {
      success: true,
      tags: tags
    };

  }catch(error){
    return {
      success: false,
      message: error.message
    };
  };
};


export {
  getTagswithChildren,
  searchTags
}
