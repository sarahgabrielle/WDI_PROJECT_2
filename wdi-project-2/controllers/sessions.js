const User = require('../models/user');

function newRoute(req,res) {
  res.render('session/login');
}

function createRoute(req,res) {
  User
    .findOne({ email: req.body.email })
    .then((user) => {
      if(!user || !user.validatePassword(req.body.password)) {
        req.flash('danger', 'Unknown email/password combination');
        res.status(401).render('session/login', { message: 'Unrecognised credentials' });
      }
      req.session.userId = user.id;
      req.flash('success', `${user.username}, you've logged in!`);

      return res.redirect('/homepages');
    });
}

function deleteRoute(req, res) {
  return req.session.regenerate(() => {
    req.flash('success', 'You successfully logged out.');
    res.redirect('/');
  });

}

module.exports = {
  new: newRoute,
  create: createRoute,
  delete: deleteRoute
};
