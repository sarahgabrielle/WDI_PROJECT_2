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
        image: 'https://static.pexels.com/photos/157887/sunglasses-white-dress-fashion-model-157887.jpeg',
        name: 'Chic'
      }, {
        image: 'http://metrouk2.files.wordpress.com/2014/02/test125430.jpg',
        name: 'Vintage'
      }, {
        image: 'http://www.theecoedit.co.uk/wp-content/uploads/2016/06/acejig-featured1.jpg',
        name: 'Ethical'
      }]);
  })
  .then(categories => {
    console.log(`${categories.length} categories were created`);

    return new Promise((resolve, reject) => {
      let categoryToUpdate;
      Category
        .findOne({ name: 'Chic' })
        .exec()
        .then(category => {

          categoryToUpdate = category;

          return Brand
            .create([{
              name: 'Maje',
              mainimage: 'https://pbs.twimg.com/profile_images/905733519531544577/QL-9eREG_400x400.jpg',
              images: [{
                url: 'https://uk.maje.com/dw/image/v2/AAON_PRD/on/demandware.static/-/Sites-maje-catalog-master-H13/default/dw4e3ee8cd/images/h13/Maje_E17ROYAN-0313_H_1.jpg?sw=500&sh=500&sm=fit'
              }, {
                url: 'https://us.maje.com/dw/image/v2/AAON_PRD/on/demandware.static/-/Sites-maje-catalog-master-H13/default/dwf6262f2c/images/h13/Maje_E17PANDORA-0071_H_4.jpg?sw=750&sh=750&sm=fit'
              }, {
                url: 'https://us.maje.com/dw/image/v2/AAON_PRD/on/demandware.static/-/Sites-maje-catalog-master-H13/default/dwd63e9656/images/h13/Maje_E17RIMIA-02_H_1.jpg?sw=500&sh=500&sm=fit'
              }, {
                url: 'https://uk.maje.com/dw/image/v2/AAON_PRD/on/demandware.static/-/Sites-maje-catalog-master-H13/default/dw00fc1a71/images/h13/Maje_E17RIAM-0101_H_1.jpg?sw=700&sh=700&sm=fit'
              }]
            }, {
              name: 'Sandro',
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
