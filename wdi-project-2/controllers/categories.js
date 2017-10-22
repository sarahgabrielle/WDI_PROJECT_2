const Category = require('../models/category');

function newRoute(req,res) {
  res.render('homepages/index');
}

function createRoute(req, res) {
  Category
    .find()
    .exec()
    .then((categories) => {
      res.render('homepages/index', {categories});

      categories.brands.push(req.body);
      return categories.save();
    })
    .catch((err) => {
      res.status(500).end(err);
    });
}

function showRoute(req, res) {
  Category
    .findById(req.params.id)
    .exec()
    .then((category) => {
      if(!category) return res.status(404).end('Not Found');
      res.render('homepages/show', {category});
    })
    .catch((err) => {
      res.status(500).end(err);
    });
}


module.exports = {
  new: newRoute,
  create: createRoute,
  show: showRoute
};
