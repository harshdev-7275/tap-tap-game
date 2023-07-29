const startText = document.getElementById("start-text");
const startBtn = document.getElementById("start-btn");
const start = document.getElementById("start");

window.addEventListener("DOMContentLoaded", () => {
  setInterval(() => {
    startText.classList.remove("move-right");
    startText.classList.add("move-left");
    setTimeout(() => {
      startText.classList.remove("move-left");
      startText.classList.add("move-right");
    }, 500);
  }, 1000);
  startBtn.addEventListener("click", () => {
    startBtn.style.transform = "scale(0.9)";
    setTimeout(() => {
      start.style.display = "none";
    }, 300);
  });
});
  