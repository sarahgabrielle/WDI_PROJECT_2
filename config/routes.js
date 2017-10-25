const express = require('express');
const router  = express.Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const categories = require('../controllers/categories');
const brands = require('../controllers/brands');
const secureRoute = require('../lib/secureRoute');

// An index route
router.get('/', (req, res) => res.render('index'));

//User Profile page where you can see all of your "saved brands along with your username etc"
router.get('/likes', (req, res) => res.render('likes'));

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
  .get(secureRoute, categories.index);

//Create a new brand
router.route('/categories/:id/brands/new')
  .get(secureRoute, brands.new);

// SHOW for categories
router.route('/categories/:id')
  .get(secureRoute, categories.show)
  .post(secureRoute, brands.create);

router.route('/brands/:id/favorite')
  .post(secureRoute, brands.favorite);

// SHOW for brands
router.route('/brands/:id')
  .get(secureRoute, brands.show)
  .put(secureRoute, brands.update)
  .delete(secureRoute, brands.delete);

router.route('/brands/:id/edit')
  .get(secureRoute, brands.edit);



module.exports = router;
