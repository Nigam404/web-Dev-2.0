var btn = document.getElementById("add");
btn.addEventListener("click", addData);

//create element function................................................................................
function createElement(obj) {
  let ULlist = document.getElementById("datalist");
  //Creating list item for newly added data.
  let newLi = document.createElement("li");
  let textinfo = obj.amount + " " + obj.description + " " + obj.catagory;
  newLi.className = "list-group-item";
  newLi.appendChild(document.createTextNode(textinfo));

  //Edit button.
  let editbtn = document.createElement("button");
  editbtn.className = "btn btn-warning btn-sm float-right edit";
  editbtn.appendChild(document.createTextNode("Edit"));
  editbtn.onclick = () => {
    //Putting wrongly submitted value in the field.
    document.getElementById("amount").value = obj.amount;
    document.getElementById("desc").value = obj.description;
    document.getElementById("catagory").value = obj.catagory;

    axios
      .delete(`http://localhost:4000/api/${obj.id}`)
      .then(() => {
        alert("edit and submit again");
        ULlist.removeChild(newLi);
      })
      .catch();

    //After correcting user has to click add expense btn.
  };

  //Delete button
  let deletebtn = document.createElement("button");
  deletebtn.className = "btn btn-danger btn-sm float-right delete";
  deletebtn.appendChild(document.createTextNode("delete"));
  deletebtn.onclick = () => {
    axios
      .delete(`http://localhost:4000/api/${obj.id}`)
      .then(() => {
        ULlist.removeChild(newLi);
        alert("Data deleted successfully");
      })
      .catch((err) => console.log(err));
  };

  //Adding  buttons to new list
  newLi.appendChild(deletebtn);
  newLi.appendChild(editbtn);

  //Appending list to UI
  ULlist.appendChild(newLi);
}

//DRIVER FUNCTION..........................................................................................
function addData() {
  let obj = {
    amount: document.getElementById("amount").value,
    description: document.getElementById("desc").value,
    catagory: document.getElementById("catagory").value,
  };

  //Storing in DB.
  axios
    .post("http://localhost:4000/api/", obj)
    .then((insertedObj) => {
      createElement(insertedObj);
    })
    .catch((err) => console.log(err));
}

//Below code will execute always when dom get reloaded....................................................
axios
  .get("http://localhost:4000/api/")
  .then((res) => {
    res.data.forEach((e) => {
      createElement(e);
    });
  })
  .catch((err) => console.log(err));
