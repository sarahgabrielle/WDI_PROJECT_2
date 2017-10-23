const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  image: String,
  name: String,
  brands: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Brand' }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Category', CategorySchema);
