const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
  name: String,
  image: String,
  images: []
});

module.exports = mongoose.model('Brand', BrandSchema);
