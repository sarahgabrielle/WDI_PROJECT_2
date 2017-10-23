const express = require('express');
const router  = express.Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const categories = require('../controllers/categories');
const brands = require('../controllers/brands');

// An index route
router.get('/', (req, res) => res.render('index'));

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
router.route('/categories')
  .get(categories.index);

//Create a new brand
router.route('/categories/:id/brands/new')
  .get(brands.new);

// SHOW for categories
router.route('/categories/:id')
  .get(categories.show)
  .post(brands.create);

// SHOW for brands
router.route('/brands/:id')
  .get(brands.show)

module.exports = router;
