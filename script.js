// DOM Elements
const registrationPopup = document.getElementById("registrationPopup");
const registrationForm = document.getElementById("registrationForm");
const playerNameInput = document.getElementById("playerName");
const startPopup = document.getElementById("startPopup");
const startGameButton = document.getElementById("startGameButton");
const gameContainer = document.getElementById("gameContainer");
const playerNameDisplay = document.getElementById("playerNameDisplay");
const playerGreeting = document.getElementById("playerGreeting");
const box = document.getElementById("box");
const ball = document.getElementById("ball");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("highScore");
const gameOverScreen = document.getElementById("gameOver");
const restartButton = document.getElementById("restart");

// Sounds
const hitSound = new Audio("https://www.soundjay.com/button/beep-07.wav");
const gameOverSound = new Audio("https://www.soundjay.com/button/beep-09.wav");

// Variables
let score = 0;
let ballX = Math.random() * 380;
let ballY = 0;
let ballSpeedY = 2;
let boxX = 150;
let isDragging = false;

// High Score
let highScore = localStorage.getItem("highScore") || 0;
highScoreDisplay.textContent = highScore;

// Player Data
let playerData = JSON.parse(localStorage.getItem("playerData")) || null;

// Show Registration or Start Popup
if (!playerData) {
  registrationPopup.style.display = "block"; // Show registration popup
} else {
  playerGreeting.textContent = playerData.name;
  startPopup.style.display = "block"; // Show start game popup
}

// Handle Registration Form Submission
registrationForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const playerName = playerNameInput.value.trim();
  if (playerName) {
    const playerId = `ID-${Math.random().toString(36).substr(2, 9)}`; // Generate random ID
    playerData = { name: playerName, id: playerId };
    localStorage.setItem("playerData", JSON.stringify(playerData));
    registrationPopup.style.display = "none";
    playerGreeting.textContent = playerData.name;
    startPopup.style.display = "block";
  }
});

// Start Game Button
startGameButton.addEventListener("click", () => {
  startPopup.style.display = "none";
  gameContainer.style.display = "block";
  playerNameDisplay.textContent = playerData.name;
  gameLoop();
});

// Update box position for touch events
document.addEventListener("touchstart", (e) => {
  isDragging = true;
  e.preventDefault();
});

document.addEventListener("touchmove", (e) => {
  if (isDragging) {
    const touchX = e.touches[0].clientX;
    const containerRect = document.querySelector(".game-container").getBoundingClientRect();
    boxX = Math.min(Math.max(touchX - containerRect.left - 40, 0), containerRect.width - 80);
    box.style.left = `${boxX}px`;
    e.preventDefault();
  }
});

document.addEventListener("touchend", () => {
  isDragging = false;
});

// Game loop
function gameLoop() {
  ballY += ballSpeedY;
  ball.style.top = `${ballY}px`;
  ball.style.left = `${ballX}px`;

  if (ballY >= 520 && ballX >= boxX && ballX <= boxX + 80) {
    ballY = 0;
    ballX = Math.random() * 380;
    ballSpeedY += 0.2;
    score++;
    scoreDisplay.textContent = score;
    hitSound.play();
  }

  if (ballY > 600) {
    gameOverSound.play();
    gameOverScreen.style.display = "block";
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore);
    }
    highScoreDisplay.textContent = highScore;
    cancelAnimationFrame(gameLoopID);
    return;
  }

  gameLoopID = requestAnimationFrame(gameLoop);
}

// Restart game
restartButton.addEventListener("click", () => {
  score = 0;
  ballY = 0;
  ballX = Math.random() * 380;
  ballSpeedY = 2;
  scoreDisplay.textContent = score;
  gameOverScreen.style.display = "none";
  gameLoop();
});

// Start the game loop
let gameLoopID;
