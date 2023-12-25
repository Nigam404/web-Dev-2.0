const Product = require("../models/productM");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false, //setting editing to false because it is add product controller function
  });
};

exports.postAddProduct = (req, res, next) => {
  //getting data from request body.
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  //inserting to table.
  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
  }) //create returns us a promise.
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit; //getting query parameter from url.
  if (!editMode) {
    return res.redirect("/");
  }
  //else part below if editmode=true.
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then((product) => {
      if (!product) {
        //if no product found then redirection occur.
        res.redirect("/");
      } else {
        res.render("admin/edit-product", {
          pageTitle: "Edit Product",
          path: "/admin/edit-product",
          editing: editMode,
          product: product,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditProduct = (req, res, next) => {
  //retrieving updated data from request object
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  Product.findByPk(prodId)
    .then((product) => {
      //assigning updated values
      product.title = updatedTitle;
      product.imageUrl = updatedImageUrl;
      product.description = updatedDesc;
      product.price = updatedPrice;

      //saving to db
      return product.save(); //save is a sequelize promise method to save data to db.it returns a promise
    })
    .then(() => {
      console.log("Updated Product");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then((product) => {
      return product.destroy(); //sequelize method to destroy an object.it returns a promise.
    })
    .then(() => {
      console.log("DELETED SUCCESSFULLY!!!");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};
