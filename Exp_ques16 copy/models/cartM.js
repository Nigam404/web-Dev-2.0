const fs = require("fs");
const path = require("path");

const p = path.join(__dirname, "data", "cart.json");
module.exports = class Cart {
  static addProduct(id, productPrice) {
    //step 1 - fetch previously added item to cart.
    fs.readFile(p, (err, filecontent) => {
      let cart = { products: [], totalprice: 0 };
      if (!err) {
        cart = JSON.parse(filecontent);
      }
      // step 2  if product to be added already present in cart..just increase the count
      //step 3- if new item then add it to cart
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;

      if (existingProduct) {
        updatedProduct = { ...existingProduct }; //using spread operator
        updatedProduct.qty = updatedProduct.qty + 1; //increasing quantity by 1
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 }; //adding new item and making its quantity 1
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalprice = cart.totalprice + productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
};
