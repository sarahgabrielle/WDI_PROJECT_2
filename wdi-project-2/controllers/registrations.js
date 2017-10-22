const User = require('../models/user');

function newRoute(req,res) {
  res.render('registration/signup');
}

function createRoute(req, res) {
  User
    .create(req.body)
    .then((user) => {
      req.flash('info', `Thanks for registering, ${user.username}! Please log in!`);
      res.redirect('/login');
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).render('registration/signup', { message: 'Passwords do not match' });
      }
      res.status(500).end();
    });
}

module.exports = {
  new: newRoute,
  create: createRoute
};
