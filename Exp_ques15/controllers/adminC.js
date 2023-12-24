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
  product.save();
  res.redirect("/");
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit; //getting query parameter from url
  if (!editMode) {
    return res.redirect("/");
  }
  //else part below
  //getting id from url and prepolulate product details for editing
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    if (!product) {
      //if no product found then redirection occur
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
    });
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

  //saving updated product to file
  updatedProduct.save();
  res.redirect("/admin/products");
};
exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.deleteItem(prodId); //calling product model function.
  res.redirect("/");
};
