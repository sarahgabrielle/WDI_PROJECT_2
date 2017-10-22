const express = require('express');
const router  = express.Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const Category = require('../models/category');
const Brand = require('../models/brand');

// An index route
router.get('/', (req, res) => res.render('index'));
//Homepage route where you can browse all the categories (i.e. vintage, chic, ethical etc.)
// router.get('/homepage', (req, res) => res.render('homepage'));
//Brand route where you can see the individual brand the user has selected.
router.get('/brand', (req, res) => res.render('brand'));
//User Profile page where you can see all of your "saved brands along with your username etc"
router.get('/userprofile', (req, res) => res.render('userprofile'));
// Sign up page
router.route('/register')
  .get(registrations.new)
  .post(registrations.create);
// Log in page
router.route('/login')
  .get(sessions.new)
  .post(sessions.create);
//Log out
router.route('/logout')
  .get(sessions.delete);

// INDEX for categories
router.get('/homepages', (req,res) => {
  Category
    .find()
    .exec()
    .then((categories) => {
      res.render('homepages/index', {categories});
    })
    .catch((err) => {
      res.status(500).end(err);
    });
});

// SHOW for categories
router.get('/homepages/:id', (req,res) => {
  Category
    // .findById(req.params.id)
    .findOne({ name: Category.name })
    .exec()
    .then((category) => {
      return Brand
        .create({ name: Brand.name, category: category.id });
      // res.render('homepages/show', {category});
    })
    // .exec()
    // .then((category) => {
    //   if(!category) return res.status(404).end('Not Found');
    //   res.render('homepages/show', {category});
    // })
    .catch((err) => {
      res.status(500).end(err);
    });
});

// INDEX for brands
router.get('/brands', (req,res) => {
  Brand
    .find()
    .exec()
    .then((brands) => {
      res.render('brands/index', {brands});
    })
    .catch((err) => {
      res.status(500).end(err);
    });
});

// SHOW for brands
router.get('/brands/:id', (req,res) => {
  Brand
    .findById(req.params.id)
    .exec()
    .then((brand) => {
      if(!brand) return res.status(404).end('Not Found');
      res.render('brands/show', {brand});
    })
    .catch((err) => {
      res.status(500).end(err);
    });
});


module.exports = router;
