const API = "https://script.google.com/macros/s/AKfycbwWtVoN7ypGVi8eL_tzv_5Uo-JPqZUqdGiR-Zn9xjlP7UaQFQXjYrv18yBzF2fzKzBrHQ/exec";
//<td><button onclick="sendWA('${g["Phone"]}', '${g["Name"]}')">WhatsApp</button></td>
function loadDashboard() {
  fetch(API)
    .then(res => res.json())
    .then(data => {
      let yes = 0, no = 0, pending = 0, totalGuests = 0;
      let tbodyHTML = "";

      data.forEach(g => {
        if (g["Status"] === "מגיע") { yes++; totalGuests += Number(g["Qynt"]); }
        else if (g["Status"] === "לא מגיע") no++;
        else pending++;

        tbodyHTML += `<tr>
          <td>${g["Name"]}</td>
          <td>${g["Phone"]}</td>
          <td>${g["Status"] || "ממתין"}</td>
          <td>${g["Qynt"] || 0}</td>
          <td>${g["שולחן"] || "-"}</td>
          
        </tr>`;
      });

      document.querySelector("#guestTable tbody").innerHTML = tbodyHTML;
      document.getElementById("summary").innerText = "סה״כ מגיעים: " + totalGuests;

      const ctx = document.getElementById("pieChart").getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['מגיעים', 'לא מגיעים', 'ממתינים'],
          datasets: [{
            data: [yes, no, pending],
            backgroundColor: ['#578c6b','#d62946','#d6bf29']
          }]
        },
        options: {
          responsive: true
        }
      });
    });
}

// WhatsApp לחיצה אחת
function sendWA(phone, name) {
  const msg = `היי ${name} 😊
שיר ואיתי מזמינים אותך לחתונה 💍 
נא לאשר הגעה כאן:
https://ualon1954.github.io/invited/RSVP.html?phone=${phone}`;

  const url = "https://wa.me/972" + phone.substring(1) +
              "?text=" + encodeURIComponent(msg);

  window.open(url);
}

loadDashboard();