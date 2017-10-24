const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: String
});

const brandSchema = new mongoose.Schema({
  name: String,
  mainimage: String,
  categId: String,
  images: [imageSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Brand', brandSchema);
