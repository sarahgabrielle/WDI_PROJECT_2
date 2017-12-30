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
        .findOne({ name: 'CHIC' })
        .exec()
        .then(category => {

          categoryToUpdate = category;

          return Brand
            .create([{
              name: 'HAUS VON M',
              mainimage: 'https://www.notjustalabel.com/sites/default/files/images/designers/302703/avatar/haus_von_m_notjustalabel_2136249604.jpg',
              images: [{
                url: 'https://www.notjustalabel.com/sites/default/files/styles/42_x_72_scale_and_crop/public/images/collections/302709/christianconti_hausvonm4407.jpg?itok=SbYFPuRd'
              }, {
                url: 'https://www.notjustalabel.com/sites/default/files/styles/42_x_72_scale_and_crop/public/images/collections/302709/christianconti_hausvonm4502.jpg?itok=A4YcSrgK'
              }, {
                url: 'https://www.notjustalabel.com/sites/default/files/styles/42_x_72_scale_and_crop/public/images/collections/302709/christianconti_hausvonm5111.jpg?itok=uZJsW1PO'
              }]
            }, {
              name: 'MAISON NABOODA',
              mainimage: 'https://www.notjustalabel.com/sites/default/files/images/designers/301939/avatar/maison_nabooda_notjustalabel_9650789.jpg',
              images: [{
                url: 'https://www.notjustalabel.com/sites/default/files/styles/42_x_72_scale_and_crop/public/shaima-394f.jpg?itok=hXS8o0lq'
              }, {
                url: 'https://www.notjustalabel.com/sites/default/files/styles/42_x_72_scale_and_crop/public/images/collections/301969/shaima-030f.jpg?itok=Tryjhzz0'
              }, {
                url: 'https://www.notjustalabel.com/sites/default/files/styles/42_x_72_scale_and_crop/public/images/collections/301969/shaima-117f-revised.jpg?itok=rExr6Vwi'
              }]
            }, {
              name: 'JESSICA SAMBUDIONO',
              mainimage: 'https://www.notjustalabel.com/sites/default/files/images/designers/300355/avatar/jessica_sambudiono_notjustalabel_501674439.jpg',
              images: [{
                url: 'https://www.notjustalabel.com/sites/default/files/styles/42_x_72_scale_and_crop/public/images/collections/300357/img_02251.jpg?itok=x7Q3KADj'
              }, {
                url: 'https://www.notjustalabel.com/sites/default/files/styles/42_x_72_scale_and_crop/public/images/collections/300357/ad.jpg?itok=rxV4Zdg8'
              }, {
                url: 'https://www.notjustalabel.com/sites/default/files/styles/42_x_72_scale_and_crop/public/images/collections/300357/d.jpg?itok=x-Pkqvlt'
              }]
            }]);
        });
      Category
        .findOne({ name: 'HIPSTER' })
        .exec()
        .then(category => {

          categoryToUpdate = category;

          return Brand
            .create([{
              name: 'BURGER JOYS',
              mainimage: 'https://www.notjustalabel.com/sites/default/files/images/designers/287975/avatar/burger_joys_notjustalabel_299108576.jpg',
              images: [{
                url: 'https://www.notjustalabel.com/sites/default/files/images/collections/288547/img_2889.jpg?itok=psKDQEuz'
              }, {
                url: 'https://www.notjustalabel.com/sites/default/files/images/collections/288547/img_2858.jpg?itok=gBdwTeUb'
              }, {
                url: 'https://www.notjustalabel.com/sites/default/files/images/collections/288547/img_2859.jpg?itok=ZAnE4z8V'
              }]
            }, {
              name: 'L\'ATELIER MXG',
              mainimage: 'https://www.notjustalabel.com/sites/default/files/images/designers/283821/avatar/latelier_mxg_notjustalabel_811066375.png',
              images: [{
                url: 'https://www.notjustalabel.com/sites/default/files/images/collections/289661/ateliermxg_cultleaderdenimjacketcrop_copy.jpg?itok=tDvNCcOC'
              }, {
                url: 'https://www.notjustalabel.com/sites/default/files/images/collections/289661/ateliermxg_kate_moss_frida_khalo_female.jpg?itok=ZzbHEI8E'
              }, {
                url: 'https://www.notjustalabel.com/sites/default/files/images/collections/289661/img_4433_copy.jpg?itok=gnns9U68'
              }]
            }, {
              name: 'NAYF & WAVEY',
              mainimage: 'https://www.notjustalabel.com/sites/default/files/images/designers/282103/avatar/nayf_wavey_notjustalabel_254360954.jpg',
              images: [{
                url: 'https://www.notjustalabel.com/sites/default/files/images/collections/286167/lcfma17wwjoanafongern201612071376.jpg'
              }, {
                url: 'https://www.notjustalabel.com/sites/default/files/images/collections/286167/lcfma17wwjoanafongern201612071378_copy.jpg'
              }, {
                url: 'https://www.notjustalabel.com/sites/default/files/images/collections/286167/lcfma17wwjoanafongern201612071382.jpg'
              }]
            }]);
        });
      Category
        .findOne({ name: 'BOHEMIAN' })
        .exec()
        .then(category => {

          categoryToUpdate = category;

          return Brand
            .create([{
              name: 'SOLOLU',
              mainimage: 'https://www.notjustalabel.com/sites/default/files/images/designers/290795/avatar/sololu_notjustalabel_684987762.png',
              images: [{
                url: 'https://www.notjustalabel.com/sites/default/files/images/collections/290823/jamie-full-size-04.jpg?itok=uZyCBJHC'
              }, {
                url: 'https://www.notjustalabel.com/sites/default/files/images/collections/290823/48.shorts.jpg?itok=dIJeikbv'
              }, {
                url: 'https://www.notjustalabel.com/sites/default/files/images/collections/290823/73.off-shoulder-dress-bell-sleeves.jpg?itok=B35qyalS'
              }]
            }, {
              name: 'JIRI KALFAR',
              mainimage: 'https://www.notjustalabel.com/sites/default/files/images/designers/113563/avatar/jiri_kalfar_notjustalabel_294752685.jpg',
              images: [{
                url: 'https://s-media-cache-ak0.pinimg.com/originals/63/96/03/639603a7915e608db56b8ef90e3a4743.jpg'
              }, {
                url: 'https://static1.squarespace.com/static/5668498869492e8025177bb2/56aa403aa2bab82578161ca0/57cfeb77e6f2e1554bc26c05/1473244028515/DSC_0572.jpg'
              }, {
                url: 'https://vg-images.condecdn.net/image/o4w9Qwp7MWA/crop/405/portrait'
              }]
            }, {
              name: 'SIR.',
              mainimage: 'https://cdn.shopify.com/s/files/1/0546/6329/collections/SIR_LOGO_grande.jpg?v=1443439291',
              images: [{
                url: 'https://www.thecoolhour.com/wp-content/uploads/2016/03/0-sir_03fxx.jpg'
              }, {
                url: 'https://www.nicdelmar.com/media/catalog/product/cache/1/thumbnail/9df78eab33525d08d6e5fb8d27136e95/s/i/sir-the-label-taylor-long-sleeve-top-in-white.jpg'
              }, {
                url: 'https://s-media-cache-ak0.pinimg.com/originals/ab/8b/39/ab8b39569bd4976981d704d6ca17af8f.jpg'
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
