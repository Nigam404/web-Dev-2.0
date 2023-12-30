//function to create scheduled meeting elements.
function createMeetingElements(obj) {
  let parent_ul = document.getElementById("scheduled");
  let details = document.createElement("li");
  details.appendChild(
    document.createTextNode(
      `Hi ${obj.name} , Please join the meeting via this https://meet.google.com/hdhy=iu at ${obj.slot}`
    )
  );
  let cancelBtn = document.createElement("button");
  cancelBtn.appendChild(document.createTextNode("Cancel"));
  //cancel button click event.
  cancelBtn.onclick = async () => {
    await axios.put(`http://localhost:3000/api/increaseSlot/${obj.slotid}`);
    await axios.delete(`http://localhost:3000/api/${obj.id}`); //deleting the user cancelled slot.
    console.log("increasing slot count by 1 and removing meeting details");
    parent_ul.removeChild(details);
    location.reload();
  };
  details.appendChild(cancelBtn);

  parent_ul.appendChild(details);
}

//Below code will executed everytimes dom get reloaded....................................................
//DRIVER Function.
async function RenderUI() {
  //Fething SLOT TIME and AVAILABILITY from DB.........................
  const slots = await axios.get("http://localhost:3000/api/getSlotInfo");

  console.log(slots);

  let parent_div = document.getElementById("parent_slot");

  slots.data.forEach((e) => {
    //if slot available then only showing slot div.
    if (e.available > 0) {
      //creating available slot elements.
      let div = document.createElement("div");
      div.className = "slot";
      let timeDiv = document.createElement("div");
      timeDiv.className = "time";
      timeDiv.innerText = e.time;
      let availableDiv = document.createElement("div");
      availableDiv.className = "availability";
      availableDiv.innerText = e.available + " available";

      //click function for booking slot.
      div.onclick = async () => {
        let userName = prompt("Enter Name:");
        let email = prompt("Enter Your Email:");
        let obj = {
          name: userName,
          mail: email,
          slot: e.time,
          slotid: e.id,
        };
        //posting slot and user details to DB.
        const res = await axios.post("http://localhost:3000/api/bookslot", obj);

        //creating meeting elements based on user inputed data and slot time.
        createMeetingElements(res.data);

        //Decreasing the current slot/clicked slot count by 1.
        await axios.put(
          `http://localhost:3000/api/decreaseSlot/${res.data.slotid}`
        );

        console.log("decreasing slot count by 1");
        location.reload();
      };
      div.appendChild(timeDiv);
      div.appendChild(availableDiv);
      parent_div.appendChild(div);
    }
  });

  //It will render the booked slot when dom get reloaded.............................
  axios
    .get("http://localhost:3000/api/getData")
    .then((users) => {
      users.data.forEach((e) => {
        createMeetingElements(e);
      });
    })
    .catch((err) => console.log(err));
}

//calling driver function
RenderUI();
