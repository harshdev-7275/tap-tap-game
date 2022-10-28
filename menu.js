const box1 = document.getElementById("box1");
const box2 = document.getElementById("box2");
const box3 = document.getElementById("box3");
const menuBoxes = document.querySelectorAll(".menu-box");
const menu = document.getElementById("menu");
const exitBtn = document.getElementById("exit-btn");
const exitInfo = document.getElementById("exit-info");
const word = document.getElementById("word");

const wordInput = document.getElementById("input-text");
const startBtn = document.getElementById("game-start-btn");
const second = document.getElementById("time");
const message = document.getElementById("message");
const currentScore = document.getElementById("current-score");
const finalScore = document.getElementById("high-score");
const speedSection = document.getElementById("speed-typing");
const wpmSection = document.getElementById("word-per-minute");
const testTime = 6;
let isPlaying;
let score = 0;
let time = testTime;
//wpm
const wpmBtn = document.getElementById("wpm-btn");

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
  box2.style.transform = "translateY(0)";
  box3.style.transform = "translateX(0)";
}

window.addEventListener("DOMContentLoaded", () => {
  speedSection.style.display = "none";
  box1.style.transform = "translateX(0)";
  box2.style.transform = "translateY(0)";
  box3.style.transform = "translateX(0)";
});

menuBoxes.forEach((box) => {
  box.addEventListener("click", (e) => {
    if (e.target.id == "box1") {
      box1.style.transform = "translateY(40%)";
      box2.style.transform = "translateY(500%)";
      box3.style.transform = "translateX(600%)";
      setTimeout(() => {
        menu.style.display = "none";
        speedSection.style.display = "";
      }, 1000);
      setTimeout(() => {
        speedTyping();
      }, 2000);
    } else if (e.target.id == "box2") {
      box1.style.transform = "translateX(-400%)";
      box2.style.transform = "translateY(-30%)";
      box3.style.transform = "translateX(600%)";
      setTimeout(() => {
        menu.remove();
        wpmSection.style.display = "block";
      }, 1000);
      wordPerMinute();
    } else {
      box1.style.transform = "translateX(-400%)";
      box2.style.transform = "translateY(500%)";
      box3.style.transform = "translateY(-50%)";
      setTimeout(() => {
        menu.remove();
      }, 1000);
      about();
    }
  });
});

function speedTyping() {
  init();
}
function wordPerMinute() {
  setTimeout(fetchWord, 500);
  wpmBtn.addEventListener("click", wpmInit);
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

// word per minute
const wpmParagraph = document.getElementById("paragraph");
const wpmInput = document.getElementById("input-wpm");
const wpmScore = document.getElementById("wpm-score");
const wpmScoreQuery = document.querySelector("#wpm-score");
const errorWpm = document.getElementById("error-wpm");
let wpmTime = 0;
let wpmPlaying;
let count = 0;
let j = 0;

wordPerMinute();
function wpmInit() {
  setTimeout(showTime, 3000);
  setTimeout(() => {
    setInterval(getTime, 1000);
  }, 3000);

  wpmInput.addEventListener("input", wpmstartMatch);
}
function fetchWord() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "http://metaphorpsum.com/sentences/5");
  xhr.onload = function () {
    if (this.status == 200) {
      wpmParagraph.innerHTML = `<h4>${this.responseText}</h4>`;
    }
  };
  xhr.send();
}
function showTime() {
  let progressBar = document.querySelector(".circular-progress");
  let valueContainer = document.querySelector(".value-container");

  let progressValue = 0;
  let progressEndValue = 60;
  let speed = 1000;

  let progress = setInterval(() => {
    progressValue++;
    valueContainer.textContent = `${progressValue} sec`;
    progressBar.style.background = `conic-gradient(
      red ${progressValue * 6}deg,
      white ${progressValue * 6}deg
  )`;
    if (progressValue == progressEndValue) {
      clearInterval(progress);
    }
  }, speed);
}

function getTime() {
  if (wpmTime <= 60) {
    wpmTime++;
    wpmPlaying = true;
  } else if (wpmTime === 61) {
    wpmPlaying = false;
  }
}
let arr = [];
let errorWord;
function wpmstartMatch() {
  arr = wpmParagraph.innerText.split("");

  let arr2 = Array.from(wpmInput.value);

  for (let i = j; i < arr2.length; i++) {
    if (arr2[i] === arr[i]) {
      count++;
      console.log(count);
      wpmPlaying = true;
    } else {
      wpmPlaying = false;
      errorWord = arr[i];
    }
  }
 

  j++;

  wpmCheckStatus();
}
wpmScoreQuery.innerHTML = `<h1>${count}</h1>`;
console.log("i m gettng hit");

function wpmCheckStatus() {
  if (wpmPlaying === false && wpmTime < 60) {
    getRed();
  } else if (wpmTime === 60 && wpmPlaying === "false") {
    let test = count / 5;
    wpmScore.innerHTML = `${test} WPS`;
  } else if (wpmTime === 60 && wpmPlaying === "true") {
    let test = count / 5;
    wpmScore.innerHTML = `${test} WPS`;
  }
}

function getRed() {
  if (errorWord === " ") {
    errorWpm.innerHTML = `<h1>Error Word is <span>Space</span></h1>`;
    wpmInput.innerHTML = "";
  } else {
    errorWpm.innerHTML = `<h1>Error Word is <span>${errorWord}</span></h1>`;
  }
}
