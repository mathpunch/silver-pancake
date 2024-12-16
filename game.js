// Ensure we are targeting the right HTML elements
const player = document.getElementById('player');
const monster = document.getElementById('monster');
const attackButton = document.getElementById('attack-button');
const joystick = document.getElementById('joystick');

// Define initial positions for player and monster
let playerPos = { x: 50, y: 50 }; // Player starts at (50vw, 50vh)
let monsterPos = { x: 80, y: 80 }; // Monster starts at (80vw, 80vh)

// Set the initial positions of the player and monster on the screen
updatePlayerPosition();
updateMonsterPosition();

// Handle mobile attack button press
attackButton.addEventListener('click', () => {
  if (isPlayerNearMonster()) {
    alert('Monster hit!');
    resetMonster();
  }
});

// Handle screen swipe (swipe left or right to move)
let startX = 0;
joystick.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});
joystick.addEventListener('touchmove', (e) => {
  let deltaX = e.touches[0].clientX - startX;
  if (deltaX > 30) moveRight();
  if (deltaX < -30) moveLeft();
});

// Handle keyboard movement (WASD or Arrow keys)
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'w':
    case 'ArrowUp':
      moveUp();
      break;
    case 's':
    case 'ArrowDown':
      moveDown();
      break;
    case 'a':
    case 'ArrowLeft':
      moveLeft();
      break;
    case 'd':
    case 'ArrowRight':
      moveRight();
      break;
    default:
      break;
  }
});

// Check if the player is near the monster
function isPlayerNearMonster() {
  return Math.abs(playerPos.x - monsterPos.x) < 10 && Math.abs(playerPos.y - monsterPos.y) < 10;
}

// Move player functions
function moveUp() {
  playerPos.y -= 5;
  updatePlayerPosition();
}

function moveDown() {
  playerPos.y += 5;
  updatePlayerPosition();
}

function moveLeft() {
  playerPos.x -= 5;
  updatePlayerPosition();
}

function moveRight() {
  playerPos.x += 5;
  updatePlayerPosition();
}

// Update player position on the screen
function updatePlayerPosition() {
  player.style.left = playerPos.x + 'vw';
  player.style.bottom = playerPos.y + 'vh';
}

// Update monster position on the screen
function updateMonsterPosition() {
  monster.style.left = monsterPos.x + 'vw';
  monster.style.bottom = monsterPos.y + 'vh';
}

// Reset monster position to a random location
function resetMonster() {
  monsterPos.x = Math.floor(Math.random() * 80) + 10;
  monsterPos.y = Math.floor(Math.random() * 80) + 10;
  updateMonsterPosition();
}

// Initial update of player and monster position on page load
document.addEventListener('DOMContentLoaded', () => {
  updatePlayerPosition();
  updateMonsterPosition();
});
