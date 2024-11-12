const gameArea = document.getElementById("gameArea");
const player = document.getElementById("player");
const scoreDisplay = document.getElementById("score");
let score = 0;
let isGameOver = false;

function startGame() {
  score = 0;
  isGameOver = false;
  scoreDisplay.innerText = score;
  player.style.left = '50%';
  generateStars();
}

function generateStars() {
  if (isGameOver) return;

  // Create a new star element
  const star = document.createElement("div");
  star.classList.add("star");
  star.style.left = `${Math.floor(Math.random() * 90)}%`;
  gameArea.appendChild(star);

  // Fall animation
  let fallInterval = setInterval(() => {
    const starTop = parseInt(window.getComputedStyle(star).getPropertyValue("top"));
    if (starTop >= 550) {
      // Check if player caught the star
      const playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
      const starLeft = parseInt(window.getComputedStyle(star).getPropertyValue("left"));
      if (Math.abs(playerLeft - starLeft) < 50) {
        score++;
        scoreDisplay.innerText = score;
      }
      star.remove();
      clearInterval(fallInterval);
    } else {
      star.style.top = starTop + 5 + "px";
    }
  }, 30);

  // Generate a new star every 1 second
  setTimeout(generateStars, 1000);
}

function movePlayer(direction) {
  const left = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
  if (direction === "left" && left > 0) {
    player.style.left = left - 20 + "px";
  } else if (direction === "right" && left < gameArea.offsetWidth - 50) {
    player.style.left = left + 20 + "px";
  }
}

// Handle touch events for mobile
gameArea.addEventListener("touchstart", (e) => {
  if (e.touches[0].clientX < window.innerWidth / 2) {
    movePlayer("left");
  } else {
    movePlayer("right");
  }
});

// Restart game
function restartGame() {
  document.querySelectorAll(".star").forEach(star => star.remove());
  startGame();
}

// Initialize the game on load
startGame();
