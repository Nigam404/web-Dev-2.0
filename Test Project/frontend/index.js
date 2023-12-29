const submit = document.getElementById("submit");
submit.addEventListener("click", addToDb);

const search = document.getElementById("search");
search.addEventListener("click", findPlayer);

//Submit button click function.............................................................
function addToDb(e) {
  e.preventDefault();
  let obj = {
    name: document.getElementById("name").value,
    dob: document.getElementById("dob").value,
    photourl: document.getElementById("photourl").value,
    birthplace: document.getElementById("place").value,
    career: document.getElementById("career").value,
    matches: document.getElementById("match").value,
    score: document.getElementById("score").value,
    fifties: document.getElementById("fifty").value,
    centuries: document.getElementById("century").value,
    wickets: document.getElementById("wicket").value,
    average: document.getElementById("average").value,
  };
  console.log(obj);
  axios.post("http://localhost:3000/api/save", obj).then((res) => {
    console.log("saved data->", res.data);
  });
}

//search button click function...........................................................
function findPlayer(e) {
  e.preventDefault();
  let searchedName = document.getElementById("search_field").value;
  axios
    .get(`http://localhost:3000/api/${searchedName}`)
    .then((res) => {
      //parent div
      let parent_div = document.getElementById("result_div");
      parent_div.innerText = ""; //for clearing old searched record data.
      //if player found.....................................................
      if (res.data.length != 0) {
        console.log("searched data->", res.data);
        alert("Matching data found!!!");

        //creating image tag.
        let image = document.createElement("img");
        image.src = res.data.photourl;
        image.height = "200";
        image.width = "200";

        //Creating personal information div.
        let personalDiv = document.createElement("div");

        let heading = document.createElement("h3");
        heading.appendChild(document.createTextNode("Personal Information:"));

        let name = document.createElement("h4");
        name.appendChild(document.createTextNode(`Name: ${res.data.name}`));

        let place = document.createElement("h4");
        place.appendChild(
          document.createTextNode(`Birth Place: ${res.data.birthplace}`)
        );

        let match = document.createElement("h4");
        match.appendChild(
          document.createTextNode(`No of matches: ${res.data.matches}`)
        );

        let score = document.createElement("h4");
        score.appendChild(document.createTextNode(`Score: ${res.data.score}`));

        let fifties = document.createElement("h4");
        fifties.appendChild(
          document.createTextNode(`No of fifties: ${res.data.fifties}`)
        );

        let centuries = document.createElement("h4");
        centuries.appendChild(
          document.createTextNode(`No of centuries: ${res.data.centuries}`)
        );

        let wickets = document.createElement("h4");
        wickets.appendChild(
          document.createTextNode(`No of wickets: ${res.data.wickets}`)
        );

        let career = document.createElement("h4");
        career.appendChild(
          document.createTextNode(`Career: ${res.data.career}`)
        );
        //appending details to personal div.
        personalDiv.appendChild(heading);
        personalDiv.appendChild(name);
        personalDiv.appendChild(place);
        personalDiv.appendChild(match);
        personalDiv.appendChild(score);
        personalDiv.appendChild(fifties);
        personalDiv.appendChild(centuries);
        personalDiv.appendChild(wickets);
        personalDiv.appendChild(career);

        //creating and implementing edit functionality...
        let editBtn = document.createElement("button");
        editBtn.appendChild(document.createTextNode("Edit"));
        editBtn.onclick = () => {
          axios
            .get(`http://localhost:3000/api/${res.data.name}`)
            .then((player) => {
              //prepopulating details back in field for editing...
              document.getElementById("name").value = player.data.name;
              document.getElementById("dob").value = player.data.dob;
              document.getElementById("photourl").value = player.data.photourl;
              document.getElementById("place").value = player.data.birthplace;
              document.getElementById("career").value = player.data.career;
              document.getElementById("match").value = player.data.matches;
              document.getElementById("score").value = player.data.score;
              document.getElementById("fifty").value = player.data.fifties;
              document.getElementById("century").value = player.data.centuries;
              document.getElementById("wicket").value = player.data.wickets;
              document.getElementById("average").value = player.data.average;
              alert("Please correct the entered data and submit again!!!");
              axios.delete(`http://localhost:3000/api/${player.data.id}`);
            })
            .then()
            .catch((err) => console.log(err));
        };

        personalDiv.appendChild(editBtn);

        //Appending all created tags to parent div.
        parent_div.appendChild(image);
        parent_div.appendChild(personalDiv);

        //if player not found...............................................
      } else {
        parent_div.innerText = "No Data found!!!";
        alert("Sorry..No data found in record.");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
