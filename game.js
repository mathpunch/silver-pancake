const player = document.getElementById('player');
const monster = document.getElementById('monster');
const attackButton = document.getElementById('attack-button');
const joystick = document.getElementById('joystick');

// Define player position
let playerPos = { x: 50, y: 50 };

// Define monster position
let monsterPos = { x: 90, y: 90 };

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
  return Math.abs(playerPos.x - monsterPos.x) < 50 && Math.abs(playerPos.y - monsterPos.y) < 50;
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

// Update player position
function updatePlayerPosition() {
  player.style.left = playerPos.x + 'vw';
  player.style.bottom = playerPos.y + 'vh';
}

// Reset monster position
function resetMonster() {
  monsterPos.x = Math.floor(Math.random() * 80) + 10;
  monsterPos.y = Math.floor(Math.random() * 80) + 10;
  monster.style.left = monsterPos.x + 'vw';
  monster.style.bottom = monsterPos.y + 'vh';
}
