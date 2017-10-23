const Brand = require('../models/brand');
const Category = require('../models/category');


//This function will direct to the new form
function newRoute(req, res) {
  Category
    .findById(req.params.id)
    .exec()
    .then(category =>{
      res.render('brands/new', {category});
    });
}

function createRoute(req,res){
  Category
    .findOne({_id: req.params.id})
    .exec()
    .then(category => {
      req._category = category;
      return Brand.create(req.body);
    })
    .then(brand => {
      req._category.brand.push(brand.id);
      console.log('before save----->', req._category);
      req._category.save();
    })
    .then(category => {
      console.log('after save------->',category);
      res.redirect(`/categories/${category._id}`);
    });
}

function showRoute(req, res) {
  Brand
    .findById(req.params.id)
    .exec()
    .then((brand) => {
      if(!brand) return res.status(404).end('Not Found');
      res.render('brands/show', {brand});
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
