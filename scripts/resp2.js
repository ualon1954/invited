// document.getElementById("contactForm").addEventListener("submit", function(e) {
//     e.preventDefault();

//     const name = document.getElementById("name").value;

//     alert("Thank you " + name + "! Your form was submitted.");
// });

function changeValue(step) {
  let input = document.getElementById("guests");
  // let value = parseInt(input.value) || 0;
  let value = parseInt(input.value), max=8 ,min=1;
 
  input.value = Math.max(1, value + step);
  // alert(input.value);
  
  document.getElementById("submit").style.display = "inline";
  attendance = "מגיע";
  
}

function test() {
    alert("test");
}

//const API = "https://script.google.com/macros/s/AKfycbx6uTxT536lhpqiIAXcuuYtYvOYeCHxNsBkdDyxTYSS-rBR218sdtVuscUKUoTCv7HS/exec";
const API = "https://script.google.com/macros/s/AKfycbxsWwZfe4Umjxxhm5i8ta5_VoCp_HoVQyZLjWxtx5s46y-tPCNacGfv9RmjxMxpWJ-Zkg/exec";

const params = new URLSearchParams(window.location.search);
const invname = document.getElementById("name");
const phone = params.get("phone");
let attendance = "";
const yes = document.getElementById("yes");
const no = document.getElementById("no");
const qty = document.getElementById("incnum");
const btn = document.getElementById("toggleBtn");
const area = document.getElementById("messageArea");
const navarea = document.getElementsByClassName("nav");
const google = document.getElementById("google");
const googlemaps = document.getElementById("google");
const navigate = document.getElementById("navigate");


// const textarea = document.getElementById("greetingText");
let greetingText = document.getElementById("greetingText");

function textChange() {
  document.getElementById("submit").style.display = "inline";
  attendance = "מגיע";
}

btn.addEventListener("click", () => {
    event.preventDefault();
    area.classList.toggle("open");

    btn.textContent = area.classList.contains("open")
        ? "סגור ברכה / הערה  ▲"
        : "כתוב ברכה / הערה ✍️";
});

    navigate.addEventListener("click", () => {
    event.preventDefault();
    navarea[0].classList.toggle("open");
    navarea[1].classList.toggle("open");

    navigate.textContent = navarea[0].classList.contains("open")
        ? "נווט אל מיקום 🧭  ❌"
        : "נווט אל מיקום 🧭  ➕";
});


waze.addEventListener('click', () => {
    event.preventDefault();
    window.location.href = 'https://waze.com/ul/hsv8sxty41';
});

googlemaps.addEventListener('click', () => {
    event.preventDefault();
    window.location.href = 'https://maps.app.goo.gl/D1gg45R6KCH4Z1HE6';
});
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
document.getElementById("greeting-box").style.display = "none";
document.getElementById("submit").style.display = "none";
// document.getElementById("waze").style.display = "none";
// document.getElementById("google").style.display = "none";
  yes.addEventListener("click", function () {
     //alert(this.value);
       event.preventDefault();
       document.getElementById("yes").style.backgroundColor = "green";
       document.getElementById("yes").style.color = "white";
       document.getElementById("yes").style.borderColor = "blue";
       document.getElementById("yes").style.borderWidth = "3px";
       document.getElementById("no").style.color = "red";
       document.getElementById("no").style.backgroundColor = "#f5f5f5";
       document.getElementById("incnum").style.display = "block";
       document.getElementById("greeting-box").style.display = "block";
       document.getElementById("submit").style.display = "inline";
       document.getElementById("navigate").style.display = "none";
       document.getElementById("guests").value = "1";
       attendance = this.value;
    });

  no.addEventListener("click", function () {
      //alert(this.value);
      event.preventDefault();
      document.getElementById("no").style.backgroundColor = "red"; 
      document.getElementById("no").style.color = "white";
      document.getElementById("yes").style.backgroundColor = "#f5f5f5";
      document.getElementById("yes").style.color = "white";
      document.getElementById("yes").style.color = "green";
      document.getElementById("yes").style.border = "none";
      document.getElementById("yes").style.borderColor = "green";
      document.getElementById("incnum").style.display = "none";
      document.getElementById("greeting-box").style.display = "none";
      document.getElementById("navigate").style.display = "none";
      document.getElementById("submit").style.display = "inline";
      document.getElementById("guests").value = "";
      // document.getElementById("notes").value = "";
      attendance = this.value;            
  });

function setContainerReadonly() {
  const container = document.getElementById("contactForm");
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
    if (field.tagName === "TEXTAREA"){
      field.readOnly = true;
    }
  });
}  

function setContainerEdit() {
  const container = document.getElementById("contactForm");
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
    if (field.tagName === "TEXTAREA"){
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
    if (d["Status"] == "") {
       document.getElementById("navigate").style.display = "none";
    }
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
      document.getElementById("toggleBtn").style.display = "inline-block";
      document.getElementById("greeting-box").style.display = "block";
      document.getElementById("navigate").style.display = "inline-block";
      
      
      if (d["Notes"] != "") {
           document.getElementById("messageArea").style.maxHeight = "300px";
           btn.textContent = "סגור ברכה / הערה  ▲";
          area.classList.toggle("open");
          btn.textContent = "סגור ברכה / הערה  ▲";
        }
        // else {
        //   document.getElementById("messageArea").style.maxHeight = "0px";
        //   btn.textContent = "כתוב ברכה / הערה ✍️";
        // }
    
    }
    else if (d["Status"] == "לא מגיע"){
       document.getElementById("yes").style.display = "none";
       document.getElementById("no").style.backgroundColor = "red";
       document.getElementById("no").style.color = "white";
       document.getElementById("incnum").style.display = "none";
      //  document.getElementById("notes").style.display = "none";
       document.getElementById("navigate").style.display = "none";
      //  document.getElementsByClassName("nav").style.display = "none";
       
       
    }
    // setTimeout(() => {
       invname.value = d["Name"];
       mobile.value = d["Phone"];
       guests.value = d["Qynt"];
       greetingText.value = d["Notes"];
       document.querySelector("h1").textContent = d["Name"];

      // setTimeout(() => {
      // }, 9000);
    
  });

let sent = false;

function send() {
  event.preventDefault();
  if (sent) return;
  sent = true;

  fetch(API , {
    method: "POST",
    body: JSON.stringify({
      phone: phone,
      name: invname.value,
      attendance: attendance,
      guests: guests.value,
      greetingText: greetingText.value
    })
  })
  .then(() => {
    if (attendance === "מגיע") {
       msg.innerText = "תודה! נתראה בחתונה!❤️";
       document.getElementById("incnum").style.display = "block";
       document.getElementById("navigate").style.display = "inline-block";
    }
    else   {
      msg.innerText = "בחירתכם נקלטה!";

    }
       msg.scrollIntoView({behavior: "smooth"});
      document.getElementById("submit").style.display = "none";
      document.getElementById("reset").style.display = "inline";
  });
  setContainerReadonly("form-container", true);
  //document.getElementsByTagName("BUTTON").disabled = true;;
  document.getElementById("submit").disabled = true;
  document.getElementById("head").style.display = "none";
  //document.getElementById("incnum").disabled = true;
  //document.getElementsByClassName(".btninc").disabled = true;
 }

 function resend() {
    //event.preventDefault();
    setContainerEdit();
   // document.getElementById("incnum").style.display = "block";
    document.getElementById("submit").style.display = "block";
    document.getElementById("reset").style.display = "none";
    document.getElementById("yes").style.display = "inline";
    document.getElementById("yes").style.margin = "30px";
    document.getElementById("no").style.display = "inline";
    document.getElementById("head").style.display = "inline";
    document.getElementById("submit").style.display = "none";
    document.getElementById("navigate").style.display = "none";
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