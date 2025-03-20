import mongoose from "mongoose";
import Tag from './tag.js';
const Schema = mongoose.Schema;


const tempSchema = new Schema({
  tag: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
  active: Boolean

})


const Temp = mongoose.model('Temp', tempSchema);

export default Temp;
