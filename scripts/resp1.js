  function changeValue(step) {
  let input = document.getElementById("guests");
  let value = parseInt(input.value) || 0;
  input.value = Math.max(1, value + step);
}

function test() {
    alert("test");
}

//const API = "https://script.google.com/macros/s/AKfycbx6uTxT536lhpqiIAXcuuYtYvOYeCHxNsBkdDyxTYSS-rBR218sdtVuscUKUoTCv7HS/exec";
const API = "https://script.google.com/macros/s/AKfycbzd_5waqwO4QvkSm67NvItgj5u4raknoqFa1hkWAH0dtV_hnGXOKTT66XPz9MXUSsO9/exec";

const params = new URLSearchParams(window.location.search);
const invname = document.getElementById("name");
const phone = params.get("phone");
let attendance = "";
const yes = document.getElementById("yes");
const no = document.getElementById("no");
const qty = document.getElementById("incnum");
// let select = document.getElementById("attendance");
// let selectedOption = select.options[select.selectedIndex];

// attendance.addEventListener("change", function () {
//   //alert(this.value);
//      qty.classList.toggle("hidden", this.value !== "מגיע");
//      document.getElementById("incnum").style.display = "block";
//      if (this.value == "לא מגיע") {

//      document.getElementById("guests").value = "";
//      document.getElementById("incnum").style.display = "none";
//       }
//   });
document.getElementById("incnum").style.display = "none";
document.getElementById("faq-item").style.display = "none";
  yes.addEventListener("click", function () {
     //alert(this.value);
       document.getElementById("yes").style.backgroundColor = "green";
       document.getElementById("yes").style.color = "white";
       document.getElementById("yes").style.borderColor = "blue";
       document.getElementById("yes").style.borderWidth = "3px";
       document.getElementById("no").style.color = "red";
       document.getElementById("no").style.backgroundColor = "#f5f5f5";
       document.getElementById("incnum").style.display = "block";
       document.getElementById("faq-item").style.display = "block";
       document.getElementById("guests").value = "1";
       attendance = "מגיע";
    });

  no.addEventListener("click", function () {
      // alert("no");
      document.getElementById("no").style.backgroundColor = "red"; 
      document.getElementById("no").style.color = "white";
      document.getElementById("yes").style.backgroundColor = "#f5f5f5";document.getElementById("yes").style.color = "white";
      document.getElementById("yes").style.color = "green";
      document.getElementById("yes").style.border = "none";
      document.getElementById("yes").style.borderColor = "green";
      document.getElementById("incnum").style.display = "none";
      document.getElementById("faq-item").style.display = "none";
      document.getElementById("guests").value = "";
      document.getElementById("notes").value = "";
      attendance = "לא מגיע"
            
  });

function setContainerReadonly() {
  const container = document.getElementById("form");
  const fields = container.querySelectorAll("input, textarea, select, button, span");

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
  const fields = container.querySelectorAll("input, textarea, select, button, span");

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
   
    if (d["Status"] == "מגיע") {
      document.getElementById("no").style.display = "none";
      document.getElementById("yes").style.backgroundColor = "green";
      document.getElementById("yes").style.color = "white";
      document.getElementById("yes").style.margin = "0";
      document.getElementById("incnum").style.display = "block";
      document.getElementById("faq-item").style.display = "block";
    
    }
    else if (d["Status"] == "לא מגיע"){
       document.getElementById("yes").style.display = "none";
       document.getElementById("no").style.backgroundColor = "red";
       document.getElementById("no").style.color = "white";
       document.getElementById("incnum").style.display = "none";
       document.getElementById("notes").style.display = "none";
       
       
    }
    // setTimeout(() => {
       invname.value = d["Name"];
       mobile.value = d["Phone"];
       guests.value = d["Qynt"];
       notes.value = d["Notes"];

      // setTimeout(() => {
      // }, 9000);
    
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
      attendance: attendance,
      guests: guests.value,
      notes: notes.value
    })
  })
  .then(() => {
    if (attendance === "מגיע" || guests > 0) {
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
    document.getElementById("yes").style.display = "inline";
    document.getElementById("yes").style.margin = "30px";
    document.getElementById("no").style.display = "inline";
    document.getElementById("head").style.display = "inline";
    if (guests > 0) {
      attendance = "מגיע";
    } 
    else {
        attendance = "לא מגיע";
    }  

   
  //   if (msg.innerText != "") {
  //    location.reload(true);
  // }
   msg.innerText = "";
   sent = false;
 }