import mongoose from "mongoose";
import Tag from "../models/tag";

const initialiseBaseCategories = async () => {
  try{

    const baseCategories = {
      hobbies: [
        'Sports', 'Music', 'Arts', 'Crafts', 'Collecting', 'Gaming', 'Outdoors', 
        'Writing', 'Photography', 'Movies', 'Anime', 'Filmmaking', 'Skating', 
        'Comedy', 'Dancing', 'Cooking', 'Gardening', 'Woodworking', 'Crocheting'
      ],
      interests: [
        'Technology', 'Engineering','Science', 'Reading', 'Travel', 'Food', 'Fashion', 
        'Movies', 'History', 'Philosophy', 'Psychology', 'Mythology', 'Astrology', 
        'Design', 'DIY', 'Coding', 'Architecture', 'Cosplay'
      ],
      values: [
        'Family', 'Education', 'Spirituality', 'Community', 'Environment', 
        'Freedom', 'Justice', 'Equality', 'MutualAid', 'Cooperation', 'Solidarity', 
        'SelfGovernance', 'Expression', 'Autonomy', 'Activism'
      ],
      sexuality: [
        'Orientation', 'Identity', 'Expression', 'Kink', 'BDSM', 'Polyamory', 
        'Asexuality', 'Relationships', 'Exploration', 'Queer'
      ],
      politics: [
        'Democracy', 'Anarchism', 'Socialism', 'Feminism', 'Decolonization', 
        'HumanRights', 'Grassroots', 'Policy', 'Organizing', 'CivicEngagement'
      ]
    };
    ;
  
    for (const [category, tags] of Object.keys(baseCategories)){
      for(const tagName of tags){
        await Tag.findOneAndUpdate(
          {tag: tagName.toLowerCase(), category},
          {tag: tagName.toLowerCase(), category},
          {upsert: true}
        )
      }
    }
    console.log('base categories initialised successfully')
    return {
      success: true,
      message: 'base categories initialised successfully'
    }

  }catch(error){
    return {
      success: false,
      error: error.message
    }
  }
}

export {initialiseBaseCategories};
