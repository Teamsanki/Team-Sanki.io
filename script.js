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
const targetScore = document.getElementById("targetScore");
const targetScoreMessage = document.getElementById("targetScoreMessage");

let score = 0;
let playerId = null;
let ballSpeed = 3;  // Ball speed
let bucket = document.getElementById("bucket");
let ball = document.getElementById("ball");
let isMobile = /Mobi|Android/i.test(navigator.userAgent); // Check if device is mobile

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
    setTargetScore();
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
  setTargetScore();
});

// Show Start Popup
function showStartPopup(playerName) {
  playerGreeting.textContent = playerName;
  startPopup.style.display = "block";
}

// Set Target Score from LocalStorage or Default
function setTargetScore() {
  const previousTarget = localStorage.getItem("targetScore");
  if (previousTarget) {
    targetScore.textContent = `Target: ${previousTarget}`;
  } else {
    targetScore.textContent = `Target: 0`;
  }
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
  let ballX = Math.random() * window.innerWidth; // Random X position for ball

  // Set the ball's initial position
  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;

  function update() {
    ballY += ballSpeed;

    // Ball bounces off the top and bottom
    if (ballY >= window.innerHeight - 50 || ballY <= 0) {
      ballSpeed *= -1;
    }

    // Update ball position
    ball.style.top = `${ballY}px`;

    // Check if the ball is inside the bucket area and increase score
    if (
      ballY >= window.innerHeight - 80 && // Ball touches the bottom
      ballY <= window.innerHeight - 50 && // Ball is within the bucket's height
      ballX >= bucket.offsetLeft && // Ball is within the left bound of the bucket
      ballX <= bucket.offsetLeft + bucket.offsetWidth // Ball is within the right bound of the bucket
    ) {
      score++;
      scoreBoard.textContent = score;

      // Increase ball speed when score reaches 10
      if (score >= 10) {
        ballSpeed = 7; // Increase speed when score hits 10
      }

      // Reset ball to the top after it touches the bucket
      ballY = 50;
      ballX = Math.random() * window.innerWidth; // Randomize X position
      ball.style.left = `${ballX}px`;
      ball.style.top = `${ballY}px`;
    }

    // End game when score reaches a certain value
    if (score >= 20) {
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
  
  // Save target score if this score is higher than previous target
  const previousTarget = localStorage.getItem("targetScore");
  if (!previousTarget || score > previousTarget) {
    localStorage.setItem("targetScore", score);
    targetScoreMessage.textContent = "You beat your target!";
  } else {
    targetScoreMessage.textContent = "Try to beat your target next time!";
  }

  gameOverPopup.style.display = "block";
}

// Restart Game
restartButton.addEventListener("click", () => {
  gameOverPopup.style.display = "none";
  gameContainer.style.display = "
