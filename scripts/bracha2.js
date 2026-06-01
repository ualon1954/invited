const btn = document.getElementById("toggleBtn");
const area = document.getElementById("messageArea");

btn.addEventListener("click", () => {
    area.classList.toggle("open");

    btn.textContent = area.classList.contains("open")
        ? "סגור ברכה ▲"
        : "כתוב ברכה ✍️";
});