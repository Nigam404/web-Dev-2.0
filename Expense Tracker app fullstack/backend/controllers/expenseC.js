const Expense = require("../models/expenseM");

//getting expense controller...............................................................................
module.exports.getExpense = (req, res, next) => {
  Expense.findAll()
    .then((expenses) => {
      res.json(expenses);
    })
    .catch((err) => console.log(err));
};

//post or adding expense controller........................................................................
module.exports.postExpense = (req, res, next) => {
  //req.body is the object pass by axios from front-end.
  Expense.create({
    //leftside is Expense model props and rightside is the user passed value.
    amount: req.body.amount,
    description: req.body.description,
    catagory: req.body.catagory,
  })
    .then(() => {
      console.log("data saved in DB");
    })
    .catch((err) => {
      console.log(err);
    });
};

//delete controller......................................................................................
module.exports.deleteExpense = (req, res, next) => {
  const id = req.params.expId;
  Expense.findByPk(id)
    .then((expense) => {
      return expense.destroy();
    })
    .then()
    .catch((err) => console.log(err));
};
