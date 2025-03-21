import mongoose from "mongoose";
import Tag from "../models/tag.js";

const initialiseBaseCategories = async () => {
  try {
    const baseCategories = {
      hobbies: [
        'Sports', 'Music', 'Arts', 'Crafts', 'Collecting', 'Gaming', 'Outdoors',
        'Writing', 'Photography', 'Movies', 'Anime', 'Filmmaking', 'Skating',
        'Comedy', 'Dancing', 'Cooking', 'Gardening', 'Woodworking', 'Crocheting'
      ],
      interests: [
        'Technology', 'Engineering', 'Science', 'Reading', 'Travel', 'Food', 'Fashion',
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

    console.log(`Starting to initialize ${Object.keys(baseCategories).length} categories`);
    
    const results = {};
    for (const [category, tags] of Object.entries(baseCategories)) {
      console.log(`Starting category: ${category} with ${tags.length} tags`);
      results[category] = { total: tags.length, success: 0, failed: 0, failures: [] };
      
      // process each tags one by one and log the results to tracj if it passed or failed
      for (const tagName of tags) {
        try {
          console.log(`Processing ${category}/${tagName}`);
          const result = await Tag.findOneAndUpdate(
            { tag: tagName.toLowerCase(), category },
            { tag: tagName.toLowerCase(), category },
            { upsert: true, new: true }
          );
          
          if (result) {
            console.log(`Successfully added ${category}/${tagName}`);
            results[category].success++;
          } else {
            console.log(`Failed to add ${category}/${tagName} - no result returned`);
            results[category].failed++;
            results[category].failures.push(tagName);
          }
        } catch (tagError) {
          console.error(`Error adding ${category}/${tagName}:`, tagError.message);
          results[category].failed++;
          results[category].failures.push(tagName);
        }
      }
      
      console.log(`Completed category ${category}: ${results[category].success} succeeded, ${results[category].failed} failed`);
    }
    
    console.log('Summary of initialization:');
    console.log(JSON.stringify(results, null, 2));
    
    console.log('Base categories initialized successfully');
    return {
      success: true,
      message: 'Base categories initialized successfully',
      results
    };
  } catch (error) {
    console.error('Major error in initialization:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// verify what was added in the database
const verifyCategories = async () => {
  try {
    // count distinct tags per category
    const categories = await Tag.distinct('category');
    console.log('Categories in database:', categories);
    
    for (const category of categories) {
      const count = await Tag.countDocuments({ category });
      const tags = await Tag.find({ category }).select('tag -_id');
      console.log(`Category ${category}: ${count} tags`);
      console.log(`Tags: ${tags.map(t => t.tag).join(', ')}`);
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error verifying categories:', error);
    return { success: false, error: error.message };
  }
};

export { initialiseBaseCategories, verifyCategories };
