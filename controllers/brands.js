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
    .findById(req.params.id)
    .exec()
    .then(category => {
      req._category = category;
      return Brand
        .create(req.body)
        .then((brand) => {
          brand.categId = category._id;
          brand.save();
          category.brands.push(brand);
          category.save();
          return res.redirect(`/categories/${category._id}`);
        });
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

function editRoute(req, res) {
  Brand
    .findById(req.params.id)
    .exec()
    .then((brand) =>{
      console.log(brand);
      res.render('brands/edit', { brand });
    });
}

function updateRoute(req,res){
  Brand
    .findById(req.params.id)
    .exec()
    .then((brand) => {
      if(!brand) return res.status(404).end('Not Found');

      for(const field in req.body) {
        brand[field] = req.body[field];
      }

      return brand.save();
    })
    .then((brand) => {
      res.redirect(`/brands/${brand._id}`);
    })
    .catch((err) => {
      res.status(500).end(err);
    });
}

function deleteRoute(req, res, next) {
  let parentCategory;
  Category
    .findOne({
      brands: { $in: [req.params.id] }
    })
    .exec()
    .then(category => {
      parentCategory = category;
      return Brand
        .findById(req.params.id);
    })
    .then((brand) => {
      if(!brand) return res.status(404).render('statics/404');
      return brand.remove();
    })
    .then(() => res.redirect(`/categories/${parentCategory._id}`))
    .catch(next);
}

module.exports = {
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute
};
