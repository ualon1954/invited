  function changeValue(step) {
  let input = document.getElementById("guests");
  let value = parseInt(input.value) || 0;
  input.value = Math.max(0, value + step);
}

function test() {
    alert("test");
}

//const API = "https://script.google.com/macros/s/AKfycbx6uTxT536lhpqiIAXcuuYtYvOYeCHxNsBkdDyxTYSS-rBR218sdtVuscUKUoTCv7HS/exec";
const API = "https://script.google.com/macros/s/AKfycbw87u6zfmBnAuwOweCy7NgDqw78v4vSbPo1qhC20SYD7i0rm_YqdE6CzcWMJajdAwp9YQ/exec";

const params = new URLSearchParams(window.location.search);
const phone = params.get("phone");
const attendance = document.getElementById("attendance");
const qty = document.getElementById("incnum");

attendance.addEventListener("change", function () {
     qty.classList.toggle("hidden", this.value !== "מגיע");
    
  });

fetch(API + "?phone=" + phone)
  .then(r => r.json())
  .then(d => {
    if (!d) { document.getElementById("msg").innerText = "לא נמצא מוזמן"; return; }
    //name.value = d["שם"];
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
      attendance: attendance.value,
      guests: guests.value
      //notes: notes.value
    })
  })
  .then(() => {
    if (attendance.value == "מגיע") {
       msg.innerText = "❤️ תודה! נתראה בחתונה!";
    }
    else   {msg.innerText = "בחירתכם נקלטה!";

    }
       msg.scrollIntoView({behavior: "smooth"});
  });
}