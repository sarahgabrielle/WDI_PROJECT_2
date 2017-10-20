const express = require('express');
const router  = express.Router();

// A home route
router.get('/', (req, res) => res.render('index'));

// Sign up page
router.get('/signup', (req, res) => res.render('signup'));
// Log in page
router.get('/login', (req, res) => res.render('login'));
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
