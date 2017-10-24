const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: String,
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Brand' }]
});

UserSchema.pre('save', function hashPassword(next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

UserSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

UserSchema.pre('validate', function checkPassword(next) {
  if(this.isModified('password') && this._passwordConfirmation!== this.password) this.invalidate('passwordConfirmation', 'Does not match');
  next();
});

UserSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.hasFavorited = function hasFavorited(brand) {
  if(!brand) return false;
  return !!this.favorites.find(_brand => brand.id === _brand.id);
};

module.exports = mongoose.model('User', UserSchema);
