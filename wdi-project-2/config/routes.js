const express = require('express');
const router  = express.Router();
const registrations = require('../controllers/registrations');
// const sessions = require('../controllers/sessions');


// An index route
router.get('/', (req, res) => res.render('index'));
//Homepage route where you can browse all the categories (i.e. vintage, chic, ethical etc.)
router.get('/homepage', (req, res) => res.render('homepage'));
//Brand route where you can see the individual brand the user has selected.
router.get('/brand', (req, res) => res.render('brand'));
//User Profile page where you can see all of your "saved brands along with your username etc"
router.get('/userprofile', (req, res) => res.render('userprofile'));
// Sign up page
// router.get('/signup', (req, res) => res.render('registration/signup'));
router.route('/signup')
  .get(registrations.new)
  .post(registrations.create);
// Log in page
router.get('/login', (req, res) => res.render('session/login'));


// RESTful routes
// All URLS should contain the PLURAL... don't chose octopus or people or something silly.

// INDEX

// NEW

// SHOW

// CREATE

// EDIT

// UPDATE

// DELETE


module.exports = router;
