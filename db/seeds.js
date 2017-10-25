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
// Brand.collection.drop();
// Create the models


User
  .create([{
    username: 'sarahg',
    email: 'sarah@sarah.com',
    password: 'password',
    passwordConfirmation: 'password'
  }])
  .then(users => {
    console.log(`${users.length} users were created`);

    return Category
      .create([{
        image: 'https://170213-images.liketoknow.it/d611a692-b883-11e7-9fed-0242ac110002?fm=jpeg&auto=format&w=405&h=405&fit=crop&dpr=2',
        name: 'Chic'
      }, {
        image: 'https://170213-images.liketoknow.it/f0a3f236-b5cf-11e7-9fed-0242ac110002?fm=jpeg&auto=format&w=405&h=405&fit=crop&dpr=2',
        name: 'Hipster'
      }, {
        image: 'https://170213-images.liketoknow.it/e9ca73c0-b878-11e7-9fed-0242ac110002?fm=jpeg&auto=format&w=405&h=405&fit=crop&dpr=2',
        name: 'Bohemian'
      }, {
        image: 'https://170213-images.liketoknow.it/01f6665c-b815-11e7-9fed-0242ac110002?fm=jpeg&auto=format&w=405&h=405&fit=crop&dpr=2',
        name: 'Artsy'
      }, {
        image: 'https://170213-images.liketoknow.it/aca17452-47a0-11e7-9fed-0242ac110002?fm=jpeg&auto=format&w=405&h=405&fit=crop&dpr=2',
        name: 'Urban'
      }, {
        image: 'https://170213-images.liketoknow.it/2755eb86-b885-11e7-9fed-0242ac110002?fm=jpeg&auto=format&w=405&h=405&fit=crop&dpr=2',
        name: 'Trendy'
      }]);
  })
  .then(categories => {
    console.log(`${categories.length} categories were created`);

    return new Promise((resolve, reject) => {
      let categoryToUpdate;
      Category
        .findOne({ name: 'HIPSTER' })
        .exec()
        .then(category => {

          categoryToUpdate = category;

          return Brand
            .create([{
              name: 'WATER',
              mainimage: 'https://scontent-atl3-1.cdninstagram.com/t51.2885-15/s640x640/e35/19379256_1791950654155596_2512029575752450048_n.jpg',
              images: [{
                url: 'https://cdn.shopify.com/s/files/1/1053/9082/products/SHOT_13_1566_grande.jpg?v=1483665081'
              }, {
                url: 'https://cdn.shopify.com/s/files/1/1053/9082/products/SHOT_18_1869_d1047012-114f-4b79-8856-682e2f48c7b4_grande.jpg?v=1483660236'
              }, {
                url: 'https://cdn.shopify.com/s/files/1/1053/9082/products/SHOT_11_1392_556313b1-1804-4e9f-9c9c-9774d47c1f1e_grande.jpg?v=1483660864'
              }]
            }, {
              name: 'LAURS KEMP',
              mainimage: 'http://cdn.shopify.com/s/files/1/0831/6977/products/LAURS-KEMP--Crop-Boob-Tee2_grande.jpg?v=1466226573',
              images: [{
                url: 'https://static1.squarespace.com/static/57a3ed5e414fb54f51f72109/57a3f9515016e144770437c5/58a5435dbe6594753033107d/1506668079076/arlo7.jpg?format=1000w'
              }, {
                url: 'https://static1.squarespace.com/static/57a3ed5e414fb54f51f72109/57a3f9515016e144770437c5/5802a2429f74569f6bce8bdb/1487282764500/Paloma+Jeans+4.JPG?format=1500w'
              }, {
                url: 'https://static1.squarespace.com/static/57a3ed5e414fb54f51f72109/57a3f9515016e144770437c5/58ca0f5786e6c081effc13ba/1489637224560/josie+clem+cover.jpg?format=1000w'
              }]
            }]);
        })
        .then(brands => {
          console.log(`${brands.length} brands were created`);
          brands.forEach(brand => {
            categoryToUpdate.brands.push(brand.id);
          });
          return categoryToUpdate.save();
        })
        .then(resolve)
        .catch(reject);
    });
  })
  .then(category => {
    console.log('Finished!');
  })
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
