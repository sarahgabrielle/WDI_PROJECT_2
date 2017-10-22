const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
  name: String,
  image: String,
  category: { type: mongoose.Schema.ObjectId, ref: 'Category', required: true }
});

module.exports = mongoose.model('Brand', BrandSchema);
