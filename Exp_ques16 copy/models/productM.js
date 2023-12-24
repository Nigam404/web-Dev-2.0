const db = require("../util/database");

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute(
      "insert into products(title,price,imageUrl,description)values(?,?,?,?)",
      [this.title, this.price, this.imageUrl, this.description]
    );
    //we can also pass data directly but this '?' method add extra security to our app
  }

  static fetchAll() {
    return db.execute("select * from products"); // it will return a promise
  }
  static findById(id) {
    return db.execute("select * from products where products.id=?", [id]);
  }

  static deleteItem(id) {
    return db.execute("delete from products where products.id=?", [id]);
  }
  updateItem(id) {
    return db.execute(
      "update products set products.title=?,products.price=?,products.imageUrl=?,products.description=? where products.id=?",
      [this.title, this.price, this.imageUrl, this.description, id]
    );
  }
};
