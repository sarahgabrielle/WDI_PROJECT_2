const User = require('../models/user');

function newRoute(req,res) {
  res.render('session/login');
}

function createRoute(req,res) {
  User
    .find()
    .exec()
    .then(() => {
      res.render('userprofile');
    })
    .catch(err => {
      res.status(500).end(err);
    });
}



module.exports = {
  new: newRoute,
  create: createRoute
};
