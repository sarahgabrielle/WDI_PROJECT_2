const Category = require('../models/category');
const Brand = require('../models/brand');

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
    .exec()
    .then((category) => {
      if(!category) return res.status(404).end('Not Found');

      Brand
        .find({ category: category.id })
        .exec()
        .then(brands => {
          res.render('categories/show', {category, brands});
        });
    })
    .catch((err) => {
      res.status(500).end(err);
    });
}

module.exports = {
  index: indexRoute,
  show: showRoute
};
