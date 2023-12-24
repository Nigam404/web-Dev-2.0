const Product = require("../models/productM");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false, //setting editing to false because it is add product controller function
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price); //id=null because it is a new product
  product
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch(() => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit; //getting query parameter from url
  if (!editMode) {
    return res.redirect("/");
  }
  //else part below if editmode=true
  //getting id from url and prepolulate product details for editing
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      if (!product[0]) {
        //if no product found then redirection occur
        res.redirect("/");
      } else {
        res.render("admin/edit-product", {
          pageTitle: "Edit Product",
          path: "/admin/edit-product",
          editing: editMode,
          product: product[0], //as product is an array of 1 element so 0th index contain actual data
        });
        console.log(product[0]);
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

  //creating new product object based on updated data
  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedDesc,
    updatedPrice
  );

  //updating product in db
  console.log(updatedProduct);
  updatedProduct
    .updateItem(prodId)
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([row]) => {
      res.render("admin/products", {
        prods: row,
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
  Product.deleteItem(prodId)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};
