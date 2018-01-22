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

    return Brand
      .create([
        {
          name: 'HAUS VON M',
          category: categories[0]._id,
          mainimage: 'https://www.notjustalabel.com/sites/default/files/images/designers/302703/avatar/haus_von_m_notjustalabel_2136249604.jpg',
          images: [{
            url: 'https://www.notjustalabel.com/sites/default/files/styles/images/collections/302709/christianconti_hausvonm4407.jpg?itok=SbYFPuRd'
          }, {
            url: 'https://www.notjustalabel.com/sites/default/files/styles/images/collections/302709/christianconti_hausvonm4502.jpg?itok=A4YcSrgK'
          }, {
            url: 'https://www.notjustalabel.com/sites/default/files/styles/images/collections/302709/christianconti_hausvonm5111.jpg?itok=uZJsW1PO'
          }]
        }, {
          name: 'MAISON NABOODA',
          category: categories[0]._id,
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
          category: categories[0]._id,
          mainimage: 'https://www.notjustalabel.com/sites/default/files/images/designers/300355/avatar/jessica_sambudiono_notjustalabel_501674439.jpg',
          images: [{
            url: 'https://www.notjustalabel.com/sites/default/files/styles/42_x_72_scale_and_crop/public/images/collections/300357/img_02251.jpg?itok=x7Q3KADj'
          }, {
            url: 'https://www.notjustalabel.com/sites/default/files/styles/42_x_72_scale_and_crop/public/images/collections/300357/ad.jpg?itok=rxV4Zdg8'
          }, {
            url: 'https://www.notjustalabel.com/sites/default/files/styles/42_x_72_scale_and_crop/public/images/collections/300357/d.jpg?itok=x-Pkqvlt'
          }]
        },{
          name: 'BURGER JOYS',
          category: categories[1]._id,
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
          category: categories[1]._id,
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
          category: categories[1]._id,
          mainimage: 'https://www.notjustalabel.com/sites/default/files/images/designers/282103/avatar/nayf_wavey_notjustalabel_254360954.jpg',
          images: [{
            url: 'https://www.notjustalabel.com/sites/default/files/images/collections/286167/lcfma17wwjoanafongern201612071376.jpg'
          }, {
            url: 'https://www.notjustalabel.com/sites/default/files/images/collections/286167/lcfma17wwjoanafongern201612071378_copy.jpg'
          }, {
            url: 'https://www.notjustalabel.com/sites/default/files/images/collections/286167/lcfma17wwjoanafongern201612071382.jpg'
          }]
        }, {
          name: 'SOLOLU',
          category: categories[2]._id,
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
          category: categories[2]._id,
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
          category: categories[2]._id,
          mainimage: 'https://cdn.shopify.com/s/files/1/0546/6329/collections/SIR_LOGO_grande.jpg?v=1443439291',
          images: [{
            url: 'https://www.thecoolhour.com/wp-content/uploads/2016/03/0-sir_03fxx.jpg'
          }, {
            url: 'https://www.nicdelmar.com/media/catalog/product/cache/1/thumbnail/9df78eab33525d08d6e5fb8d27136e95/s/i/sir-the-label-taylor-long-sleeve-top-in-white.jpg'
          }, {
            url: 'https://s-media-cache-ak0.pinimg.com/originals/ab/8b/39/ab8b39569bd4976981d704d6ca17af8f.jpg'
          }]
        }, {
          name: 'CHI-KA',
          category: categories[3]._id,
          mainimage: 'https://www.notjustalabel.com/sites/default/files/images/designers/303419/avatar/chi-ka_notjustalabel_958372599.png',
          images: [{
            url: 'https://www.notjustalabel.com/sites/default/files/styles/images/collections/303423/img_9312.jpg?itok=1bK2BqrC'
          }, {
            url: 'https://www.notjustalabel.com/sites/default/files/styles/images/collections/303423/img_1181.jpg?itok=WNlBXqi6'
          }, {
            url: 'https://www.notjustalabel.com/sites/default/files/styles/images/collections/303423/img_0561.jpg?itok=iSu4NRIl'
          }]
        }, {
          name: 'ASHMINDER SIHRA',
          category: categories[3]._id,
          mainimage: 'https://www.notjustalabel.com/sites/default/files/images/designers/302963/avatar/ashminder_sihra_notjustalabel_961293405.jpg',
          images: [{
            url: 'https://www.notjustalabel.com/sites/default/files/styles/images/collections/302971/05980001.jpg?itok=FbzpG-Wj'
          }, {
            url: 'https://www.notjustalabel.com/sites/default/files/styles/images/collections/302971/06030031.jpg?itok=zWb2xLbz'
          }, {
            url: 'https://www.notjustalabel.com/sites/default/files/styles/images/collections/302971/05940006.jpg?itok=04_jPnv8'
          }]
        }, {
          name: 'IRMA SKJöTH',
          category: categories[3]._id,
          mainimage: 'https://www.notjustalabel.com/sites/default/files/images/designers/301901/avatar/irma_skjoth_notjustalabel_1057424104.jpg',
          images: [{
            url: 'https://www.notjustalabel.com/sites/default/files/styles/images/collections/301907/irma_skjoth_jl_005.jpg?itok=QYAJjv_8'
          }, {
            url: 'https://www.notjustalabel.com/sites/default/files/styles/images/collections/301907/irma_skjoth_jl_006.jpg?itok=kMYJhICK'
          }, {
            url: 'https://www.notjustalabel.com/sites/default/files/styles/images/collections/301907/irma_skjoth_jl_014.jpg?itok=OrW673f4'
          }]
        }, {
          name: '8IGB',
          category: categories[4]._id,
          mainimage: 'https://www.notjustalabel.com/sites/default/files/images/designers/300469/avatar/8igb_community_clothing_notjustalabel_185000079.jpg',
          images: [{
            url: 'https://www.notjustalabel.com/sites/default/files/styles/images/collections/304051/_mg_8887.jpg?itok=7gqkj-Er'
          }, {
            url: 'https://www.notjustalabel.com/sites/default/files/styles/images/collections/304051/_mg_8860.jpg?itok=86cOrXdN'
          }, {
            url: 'https://www.notjustalabel.com/sites/default/files/styles/images/collections/304051/img0013.jpg?itok=aoh1lyyU'
          }]
        }, {
          name: 'URBAN GILT',
          category: categories[4]._id,
          mainimage: 'https://www.notjustalabel.com/sites/default/files/images/designers/300311/avatar/urban_gilt_notjustalabel_1742903349.png',
          images: [{
            url: 'https://www.notjustalabel.com/sites/default/files/styles/images/collections/300781/maddox_grey_1_mini.jpg?itok=zOdw4_R4'
          }, {
            url: 'https://www.notjustalabel.com/sites/default/files/styles/images/collections/300781/ridley_khaki_1_mini.jpg?itok=tsnI7fnR'
          }, {
            url: 'https://www.notjustalabel.com/sites/default/files/styles/images/collections/300781/ledbury_grey_1_mini.jpg?itok=dDLEeYb-'
          }]
        }, {
          name: 'FASE FACTORY',
          category: categories[4]._id,
          mainimage: 'https://www.notjustalabel.com/sites/default/files/images/designers/298403/avatar/fase_factory_notjustalabel_926241543.jpg',
          images: [{
            url: 'https://www.notjustalabel.com/sites/default/files/styles/images/collections/303941/look_1f.jpg?itok=40gMK0sq'
          }, {
            url: 'https://www.notjustalabel.com/sites/default/files/styles/images/collections/303941/look_8f.jpg?itok=U8fDfzu6'
          }, {
            url: 'https://www.notjustalabel.com/sites/default/files/styles/images/collections/303941/look_5f.jpg?itok=WgxkG6Wh'
          }]
        }, {
          name: 'SERGIO WONDER',
          category: categories[5]._id,
          mainimage: 'https://www.notjustalabel.com/sites/default/files/images/designers/303819/avatar/sergio_wonder_notjustalabel_1811139987.jpg',
          images: [{
            url: 'https://www.notjustalabel.com/sites/default/files/styles/images/collections/303833/file_000.jpeg?itok=BK8PegNf'
          }, {
            url: 'https://www.notjustalabel.com/sites/default/files/styles/images/collections/303833/file_007.jpeg?itok=xZUPokd1'
          }, {
            url: 'https://www.notjustalabel.com/sites/default/files/styles/images/collections/303833/file_008.jpeg?itok=-gVouEQQ'
          }]
        }, {
          name: 'SIDIKAI',
          category: categories[5]._id,
          mainimage: 'https://www.notjustalabel.com/sites/default/files/images/designers/300395/avatar/sidikai_notjustalabel_348901210.png',
          images: [{
            url: 'https://www.notjustalabel.com/sites/default/files/styles/images/collections/300403/sidikai_studio_kodahblackblazerethereum.jpg?itok=ddsoMPWZ'
          }, {
            url: 'https://www.notjustalabel.com/sites/default/files/styles/images/collections/300403/look3_kodah.jpg?itok=G3TM49J6'
          }, {
            url: 'https://www.notjustalabel.com/sites/default/files/styles/images/collections/300403/look4_kodah.jpg?itok=XkAP7qoM'
          }]
        }, {
          name: 'KATYA SHVEDOVA',
          category: categories[5]._id,
          mainimage: 'https://www.notjustalabel.com/sites/default/files/images/designers/299523/avatar/katya_shvedova_notjustalabel_2129462031.jpg',
          images: [{
            url: 'https://www.notjustalabel.com/sites/default/files/styles/images/collections/299535/z_0e98ce64.jpg?itok=kGKQngex'
          }, {
            url: 'https://www.notjustalabel.com/sites/default/files/styles/images/collections/299535/z_3eac68e0.jpg?itok=WvmW00mB'
          }, {
            url: 'https://www.notjustalabel.com/sites/default/files/styles/images/collections/299535/z_62426359.jpg?itok=DV9ivSVh'
          }]
        }]);
  })
  .then(brands => {
    console.log(`${brands.length} brands were created`);
  })
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
