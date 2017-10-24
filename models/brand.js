const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: String
});

const brandSchema = new mongoose.Schema({
  name: { type: String, uppercase: true },
  mainimage: String,
  categId: String,
  images: [imageSchema]
}, {
  timestamps: true
});

brandSchema.virtual('category', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'brands',
  justOne: true
});

module.exports = mongoose.model('Brand', brandSchema);
