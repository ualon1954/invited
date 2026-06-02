const btn = document.getElementById("toggleBtn");
const area = document.getElementById("messageArea");

btn.addEventListener("click", () => {
    event.preventDefault();
    if (area.style.display === "none") {
        area.style.display = "block";
        btn.textContent = "סגור ברכה ▲";
    } else {
        area.style.display = "none";
        btn.textContent = "כתוב ברכה ✍️";
    }
});