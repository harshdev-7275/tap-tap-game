const box1 = document.getElementById("box1");
const box2 = document.getElementById("box2");
const menuBoxes = document.querySelectorAll(".menu-box");
const menu = document.getElementById("menu");
const exitBtn = document.getElementById("exit-btn");
const exitInfo = document.getElementById("exit-info");
const word = document.getElementById("word");
const reset = document.getElementById("reset");
const wordInput = document.getElementById("input-text");
const startBtn = document.getElementById("game-start-btn");
const second = document.getElementById("time");
const message = document.getElementById("message");
const currentScore = document.getElementById("current-score");
const finalScore = document.getElementById("high-score");
const speedSection = document.getElementById("speed-typing");
const testTime = 6;
let isPlaying;
let score = 0;
let time = testTime;
//wpm


//circle

exitBtn.addEventListener("mouseover", () => {
  exitInfo.style.display = "inline-block";
});
exitBtn.addEventListener("mouseout", () => {
  exitInfo.style.display = "none";
});
exitBtn.addEventListener("click", backMenu);
function backMenu() {
  speedSection.style.display = "none";
  menu.style.display = "";
  box1.style.transform = "translateX(0)";
}

window.addEventListener("DOMContentLoaded", () => {
  speedSection.style.display = "none";
  box1.style.transform = "translateX(0)";
});

menuBoxes.forEach((box) => {
  box.addEventListener("click", (e) => {
    if (e.target.id == "box1") {
      box1.style.transform = "translateY(40%)";
      setTimeout(() => {
        menu.style.display = "none";
        speedSection.style.display = "";
      }, 1000);
      setTimeout(() => {
        speedTyping();
      }, 2000);
     } 
  });
});

reset.addEventListener("click",()=>{
  wordInput.value = "";
  setTimeout(() =>{
    init();
  },2000)
  
})

function speedTyping() {
  init();
}

function about() {}

function init() {
  showWord();
  wordInput.addEventListener("input", startMatch);
  setInterval(countdown, 1000);
}
function startMatch() {
  if (matchWords()) {
    isPlaying = "true";
    time = testTime + 1;
    showWord();
    wordInput.value = "";
    score++;
  }
  if (score === -1) {
    currentScore.innerText = 0;
  } else {
    currentScore.innerHTML = score;
  }
  if (localStorage.getItem("highScore") < score) {
    localStorage.setItem("highScore", currentScore.innerHTML);
  }
  finalScore.innerHTML = localStorage.getItem("highScore");
}
function matchWords() {
  if (wordInput.value === word.innerText) {
    message.innerHTML = `<h1>Correct!!</h1>`;
    return true;
  } else {
    message.innerHTML = ``;
  }
}
function showWord() {
  fetch("https://random-word-api.herokuapp.com/word")
    .then((res) => res.json())
    .then((data) => (word.innerText = `${data[0]}`));
  setInterval(checkStatus, 50);
}

function countdown() {
  if (time > 0) {
    time--;
  } else if (time === 0) {
    isPlaying = false;
  }
  second.innerText = time;
}
function checkStatus() {
  if (!isPlaying && time === 0) {
    message.innerHTML = `<h1>Game Over!!!</h1>`;
    score = -1;
  }
}


