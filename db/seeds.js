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
        .findOne({ name: 'CHIC' })
        .exec()
        .then(category => {

          categoryToUpdate = category;

          return Brand
            .create([{
              name: 'MAJE',
              mainimage: 'https://pbs.twimg.com/profile_images/905733519531544577/QL-9eREG_400x400.jpg',
              images: [{
                url: 'https://us.maje.com/dw/image/v2/AAON_PRD/on/demandware.static/-/Sites-maje-catalog-master-H13/default/dwf6262f2c/images/h13/Maje_E17PANDORA-0071_H_4.jpg?sw=750&sh=750&sm=fit'
              }, {
                url: 'https://us.maje.com/dw/image/v2/AAON_PRD/on/demandware.static/-/Sites-maje-catalog-master-H13/default/dwd63e9656/images/h13/Maje_E17RIMIA-02_H_1.jpg?sw=500&sh=500&sm=fit'
              }, {
                url: 'https://uk.maje.com/dw/image/v2/AAON_PRD/on/demandware.static/-/Sites-maje-catalog-master-H13/default/dw00fc1a71/images/h13/Maje_E17RIAM-0101_H_1.jpg?sw=700&sh=700&sm=fit'
              }]
            }, {
              name: 'SANDRO',
              mainimage: 'https://pbs.twimg.com/profile_images/447450936831508480/pii5zAUU_400x400.jpeg',
              images: [{
                url: 'https://uk.sandro-paris.com/on/demandware.static/-/Sites-sandro-catalog-master-H13/default/dwab8bcb99/images/h13/Sandro_R1362H-20_V_1.jpg'
              }, {
                url: 'http://uk.sandro-paris.com/on/demandware.static/-/Sites-sandro-catalog-master-H13/default/dw583d30c6/images/h13/Sandro_V6966H-MULT_V_1.jpg'
              }, {
                url: 'https://uk.sandro-paris.com/on/demandware.static/-/Sites-sandro-catalog-master-H13/default/dwa8cfa8dc/images/h13/Sandro_M9303H-20_V_1.jpg'
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
