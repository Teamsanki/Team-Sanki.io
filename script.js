// DOM Elements
const registrationPopup = document.getElementById("registrationPopup");
const registerButton = document.getElementById("registerButton");
const playerNameInput = document.getElementById("playerName");
const startPopup = document.getElementById("startPopup");
const playerGreeting = document.getElementById("playerGreeting");
const startGameButton = document.getElementById("startGameButton");
const gameContainer = document.getElementById("gameContainer");
const gameOverPopup = document.getElementById("gameOverPopup");
const restartButton = document.getElementById("restartButton");
const scoreBoard = document.getElementById("score");
const finalScore = document.getElementById("finalScore");

let score = 0;
let playerId = null;

// Initialize Game
function initGame() {
  console.log("Initializing game...");

  // Check for existing player ID in LocalStorage
  playerId = localStorage.getItem("playerId");

  if (!playerId) {
    console.log("No existing player found. Showing registration popup.");
    registrationPopup.style.display = "block";
  } else {
    console.log("Player found! Loading data...");
    const playerName = localStorage.getItem(playerId);
    showStartPopup(playerName);
  }
}

// Register New Player
registerButton.addEventListener("click", () => {
  const playerName = playerNameInput.value.trim();
  if (!playerName) {
    alert("Please enter a name!");
    return;
  }

  // Generate a random player ID
  playerId = `player_${Math.random().toString(36).substring(2, 15)}`;

  // Save player name and ID to LocalStorage
  localStorage.setItem(playerId, playerName);
  localStorage.setItem("playerId", playerId);
  registrationPopup.style.display = "none";

  showStartPopup(playerName);
});

// Show Start Popup
function showStartPopup(playerName) {
  playerGreeting.textContent = playerName;
  startPopup.style.display = "block";
}

// Start Game
startGameButton.addEventListener("click", () => {
  startPopup.style.display = "none";
  gameContainer.style.display = "block";
  startGame();
});

// Game Logic
function startGame() {
  score = 0;
  scoreBoard.textContent = score;

  let ballY = 50; // Ball's initial Y position
  let ballDirection = 5;

  function update() {
    ballY += ballDirection;

    // Ball bounces off the top and bottom
    if (ballY >= window.innerHeight - 50 || ballY <= 0) {
      ballDirection *= -1;
      score++;
      scoreBoard.textContent = score;
    }

    ball.style.top = `${ballY}px`;

    if (score >= 10) {
      endGame();
    } else {
      requestAnimationFrame(update);
    }
  }

  update();
}

// End Game
function endGame() {
  finalScore.textContent = score;
  gameOverPopup.style.display = "block";
  gameContainer.style.display = "none";
}

// Restart Game
restartButton.addEventListener("click", () => {
  gameOverPopup.style.display = "none";
  showStartPopup(playerGreeting.textContent);
});

// Initialize Game on Load
initGame();
