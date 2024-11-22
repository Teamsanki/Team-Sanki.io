// DOM Elements
const registrationPopup = document.getElementById("registrationPopup");
const registerButton = document.getElementById("registerButton");
const playerNameInput = document.getElementById("playerName");
const gameContainer = document.getElementById("gameContainer");
const box = document.getElementById("box");
const ball = document.getElementById("ball");
const scoreBoard = document.getElementById("score");
let score = 0;

// Register Button Click
registerButton.addEventListener("click", () => {
  const playerName = playerNameInput.value.trim();
  if (!playerName) {
    alert("Please enter a name!");
    return;
  }

  alert(`Welcome, ${playerName}!`);
  registrationPopup.style.display = "none";
  gameContainer.style.display = "block";
  startGame();
});

// Start Game
function startGame() {
  let ballY = 50; // Ball's initial position
  let ballDirection = 5;

  function update() {
    ballY += ballDirection;

    // Bounce the ball
    if (ballY >= window.innerHeight - 50 || ballY <= 50) {
      ballDirection *= -1;
      score++;
      scoreBoard.textContent = `Score: ${score}`;
    }

    ball.style.top = `${ballY}px`;

    requestAnimationFrame(update);
  }

  update();
}
