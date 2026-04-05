  function changeValue(step) {
  let input = document.getElementById("guests");
  let value = parseInt(input.value) || 0;
  input.value = Math.max(0, value + step);
}

function test() {
    alert("test");
}

//const API = "https://script.google.com/macros/s/AKfycbx6uTxT536lhpqiIAXcuuYtYvOYeCHxNsBkdDyxTYSS-rBR218sdtVuscUKUoTCv7HS/exec";
const API = "https://script.google.com/macros/s/AKfycbwWtVoN7ypGVi8eL_tzv_5Uo-JPqZUqdGiR-Zn9xjlP7UaQFQXjYrv18yBzF2fzKzBrHQ/exec";

const params = new URLSearchParams(window.location.search);
const invname = document.getElementById("name");
const phone = params.get("phone");
const attendance = document.getElementById("attendance");
const qty = document.getElementById("incnum");
let select = document.getElementById("attendance");
let selectedOption = select.options[select.selectedIndex];

attendance.addEventListener("change", function () {
  //alert(this.value);
     qty.classList.toggle("hidden", this.value !== "מגיע");
     document.getElementById("incnum").style.display = "block";
     if (this.value == "לא מגיע") {

     document.getElementById("guests").value = "";
     document.getElementById("incnum").style.display = "none";
      }
  });

function setContainerReadonly() {
  const container = document.getElementById("form");
  const fields = container.querySelectorAll("input, textarea, select, button");

  fields.forEach(field => {
    if (field.tagName === "SELECT") {
      field.disabled = true;
    }
    if (field.tagName === "BUTTON") {
      field.disabled = true;
    }  
    if (field.tagName === "INPUT"){
      field.readOnly = true;
    }
  });
}  

function setContainerEdit() {
  const container = document.getElementById("form");
  const fields = container.querySelectorAll("input, textarea, select, button");

  fields.forEach(field => {
    if (field.tagName === "SELECT") {
      field.disabled = false;
    }
    if (field.tagName === "BUTTON") {
      field.disabled = false;
    }  
    if (field.tagName === "INPUT"){
      field.readOnly = false;
    }
  });
}  

//setContainerReadonly("form", true);

fetch(API + "?phone=" + phone)
  .then(r => r.json())
  .then(d => {
    if (!d) { document.getElementById("msg").innerText = "לא נמצא מוזמן"; return; }
    //alert(attendance.name);
    if (d["Status"] !== "") {
       setContainerReadonly(); 
       document.getElementById("submit").style.display = "none";
       document.getElementById("reset").style.display = "inline";
       document.getElementById("head").style.display = "none";

    }
    else {
       setContainerEdit();
       //document.getElementById("submit").style.display = "block";
       document.getElementById("reset").style.display = "none";
       document.getElementById("head").style.display = "inline";
    }  
   
    if (d["Status"] == "לא מגיע") {
    //alert(selectedOption.text) ;  
    d["Status"] = "לא נוכל להגיע";
       //qty.classList.toggle("hidden", this.value !== "לא נוכל להגיע");
    }
    else {
       d["Status"] = "נגיע בשמחה 🎉";
       
       
    }
    invname.value = d["Name"];
    mobile.value = d["Phone"];
    guests.value = d["Qynt"];
  });

let sent = false;

function send() {
  if (sent) return;
  sent = true;

  fetch(API , {
    method: "POST",
    body: JSON.stringify({
      phone: phone,
      name: invname.value,
      attendance: attendance.value,
      guests: guests.value
      //notes: notes.value
    })
  })
  .then(() => {
    if (attendance.value == "מגיע") {
       msg.innerText = "❤️ תודה! נתראה בחתונה!";
       document.getElementById("incnum").style.display = "block";
    }
    else   {
      msg.innerText = "בחירתכם נקלטה!";

    }
       msg.scrollIntoView({behavior: "smooth"});
      document.getElementById("submit").style.display = "none";
      document.getElementById("reset").style.display = "inline";
  });
  setContainerReadonly("form", true);
  //document.getElementsByTagName("BUTTON").disabled = true;;
  document.getElementById("submit").disabled = true;
  document.getElementById("head").style.display = "none";
  //document.getElementById("incnum").disabled = true;
  //document.getElementsByClassName(".btninc").disabled = true;
 }

 function resend() {
  
      setContainerEdit();
   // document.getElementById("incnum").style.display = "block";
    document.getElementById("submit").style.display = "block";
    document.getElementById("reset").style.display = "none";
    document.getElementById("head").style.display = "inline";
  //   if (msg.innerText != "") {
  //    location.reload(true);
  // }
   msg.innerText = "";
   sent = false;
 }