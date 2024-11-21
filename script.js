// Select elements
const paddle = document.getElementById("paddle");
const ball = document.getElementById("ball");
const scoreDisplay = document.getElementById("score");

// Variables
let score = 0;
let ballX = Math.random() * 380; // Random starting X position for the ball
let ballY = 0;                  // Starting Y position for the ball
let ballSpeedY = 2;             // Speed of the ball
let paddleX = 150;              // Paddle's starting X position
let isDragging = false;         // Track touch drag status

// Update paddle position for touch events
document.addEventListener("touchstart", (e) => {
  isDragging = true;
});

document.addEventListener("touchmove", (e) => {
  if (isDragging) {
    const touchX = e.touches[0].clientX; // Get touch position
    const containerRect = document.querySelector(".game-container").getBoundingClientRect();
    paddleX = Math.min(Math.max(touchX - containerRect.left - 50, 0), containerRect.width - 100); // Limit paddle within bounds
    paddle.style.left = `${paddleX}px`;
  }
});

document.addEventListener("touchend", () => {
  isDragging = false;
});

// Game loop
function gameLoop() {
  // Move the ball
  ballY += ballSpeedY;
  ball.style.top = `${ballY}px`;
  ball.style.left = `${ballX}px`;

  // Check if the ball hits the paddle
  if (ballY >= 560 && ballX >= paddleX && ballX <= paddleX + 100) {
    ballY = 0; // Reset ball to the top
    ballX = Math.random() * 380; // New random X position
    ballSpeedY += 0.2; // Increase ball speed
    score++; // Increase score
    scoreDisplay.textContent = score;
  }

  // Check if the ball hits the bottom (missed)
  if (ballY > 600) {
    alert(`Game Over! Your Score: ${score}`);
    ballY = 0; // Reset ball position
    ballX = Math.random() * 380; // Reset X position
    ballSpeedY = 2; // Reset speed
    score = 0; // Reset score
    scoreDisplay.textContent = score;
  }

  requestAnimationFrame(gameLoop); // Keep the loop going
}

// Start the game loop
gameLoop();
