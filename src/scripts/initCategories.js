import mongoose from "mongoose";
import Tag from "../models/tag.js";

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
  
    console.log(`Starting to initialize ${Object.keys(baseCategories).length} categories`);
    const results = {};
    for (const [category, tags] of Object.entries(baseCategories)){
      console.log(`Starting category: ${category} with ${tags.length} tags`);
      results[category] = {total: tags.length, success: 0, failed: 0, failures: [] }
      for(const tagName of tags){
        try{
          console.log(`processing ${tagName}`)
          const result = await Tag.findOneAndUpdate(
            {tag: tagName.toLowerCase(), category},
            {tag: tagName.toLowerCase(), category},
            {upsert: true,  new: true}
          )

          if(result){
            console.log(`${tagName}, was successfully aded to ${category}.`);
            results[category].success++;
          }else{
            console.log(`${tagName}, failed to be added to ${category}`);
            // results[category].failed++;
            // results[category].failures.push(tagName);
          }
        }catch(tagError){
          console.log('duplicate tag', tagError.message);
          results[category].failed++;
          results[category].failures.push(tagName);
        }
      }
      console.log(`completed the initialisation of ${category}, with success: ${results[category].success} and failures: ${results[category].failed}`)
    }

    console.log('summary of initialisations');
    console.log(JSON.stringify(results, null, 1))
    return {
      success: true,
      message: 'base categories initialised successfully',
      results
    }

  }catch(error){
    return {
      success: false,
      error: error.message
    }
  }
}

export {initialiseBaseCategories};
