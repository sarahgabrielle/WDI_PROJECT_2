const Category = require('../models/category');

function indexRoute(req,res) {
  Category
    .find()
    .exec()
    .then((categories) => {
      res.render('categories/index', {categories});
    })
    .catch((err) => {
      res.status(500).end(err);
    });
}

function showRoute(req, res) {
  Category
    .findById(req.params.id)
    .populate('brands')
    .exec()
    .then((category) => {
      if(!category) return res.status(404).end('Not Found');
      res.render('categories/show', {category});
    })
    .catch((err) => {
      res.status(500).end(err);
    });
}

module.exports = {
  index: indexRoute,
  show: showRoute
};
