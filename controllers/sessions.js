const User = require('../models/user');

function newRoute(req,res) {
  res.render('session/login');
  console.log('first');
}

function createRoute(req,res,next) {
  User
    .findOne({ email: req.body.email })
    .then((user) => {
      if(!user || !user.validatePassword(req.body.password)) {
        req.flash('danger', 'Unknown email/password combination');
        return res.redirect('/login');
      }
      req.session.userId = user.id;
      req.user = user;
      req.session.isAuthenticated = true;
      req.flash('success', `${user.username}, you've logged in!`);
      console.log('third');

      return res.redirect('/categories');
    })
    .catch(next);
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
