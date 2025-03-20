import express from 'express';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const tagRelationshipSchema = new Schema({
  parentTag: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag',
    required: true,
    index: true,
  },
  childTag: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag',
    required: true,
    index: true,
  }
})

tagRelationshipSchema.index({parentTag: 1, childTag: 1}, {unique: true})

const TagRelationship = mongoose.model('TagRelationship', tagRelationshipSchema);

export default TagRelationship;
