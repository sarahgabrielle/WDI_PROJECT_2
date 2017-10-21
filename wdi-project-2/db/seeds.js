const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbUri } = require('../config/environment');

mongoose.connect(dbUri, { useMongoClient: true });

// Require the model
const User = require('../models/user');
const Category = require('../models/category');
const Brand = require('../models/brand');
// Drop the model
User.collection.drop();
Category.collection.drop();
Brand.collection.drop();
// Create the models
User
  .create([{
    username: 'sarahg',
    email: 'sarah@sarah.com',
    password: 'password'
  },{
    username: 'daniel',
    email: 'daniel@daniel.com',
    password: 'password'
  }])
  .then((users) => {
    console.log(`${users.length} users created`);

    return Category
      .create([{
        name: 'Chic'
      }])
      .then((categories) => {
        console.log(`${categories.length} categories created`);

        return Brand
          .create([{
            name: 'Maje'
          }]);
      });
  })
  .then((brands) => {
    console.log(`${brands.length} brands created`);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
