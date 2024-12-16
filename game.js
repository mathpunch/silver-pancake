// Player and Game State
let player = { x: 50, y: 50, health: 100 };
let enemy = { x: 80, y: 80, health: 100, chasing: false };

// DOM Elements
const playerElem = document.getElementById('player');
const enemyElem = document.getElementById('enemy');
const attackButton = document.getElementById('attack-button');
const healthBar = document.getElementById('health-bar');
const enemyHealthBar = document.getElementById('enemy-health-bar');

// Controls
let keys = { up: false, down: false, left: false, right: false };

// Movement
document.addEventListener('keydown', (e) => {
  if (e.key === 'w' || e.key === 'ArrowUp') keys.up = true;
  if (e.key === 's' || e.key === 'ArrowDown') keys.down = true;
  if (e.key === 'a' || e.key === 'ArrowLeft') keys.left = true;
  if (e.key === 'd' || e.key === 'ArrowRight') keys.right = true;
});
document.addEventListener('keyup', (e) => {
  if (e.key === 'w' || e.key === 'ArrowUp') keys.up = false;
  if (e.key === 's' || e.key === 'ArrowDown') keys.down = false;
  if (e.key === 'a' || e.key === 'ArrowLeft') keys.left = false;
  if (e.key === 'd' || e.key === 'ArrowRight') keys.right = false;
});

// Move player
function movePlayer() {
  if (keys.up) player.y -= 2;
  if (keys.down) player.y += 2;
  if (keys.left) player.x -= 2;
  if (keys.right) player.x += 2;
  
  // Update player position on screen
  playerElem.style.left = player.x + 'vw';
  playerElem.style.bottom = player.y + 'vh';
  
  // Update health bar
  healthBar.style.width = player.health + '%';
  
  // Check for player and enemy collision (simple proximity check)
  checkEnemyInteraction();
}

// Enemy AI (simple chase logic)
function moveEnemy() {
  if (!enemy.chasing) return;

  // Simple AI: move towards player
  if (player.x > enemy.x) enemy.x += 0.5;
  if (player.x < enemy.x) enemy.x -= 0.5;
  if (player.y > enemy.y) enemy.y += 0.5;
  if (player.y < enemy.y) enemy.y -= 0.5;
  
  // Update enemy position
  enemyElem.style.left = enemy.x + 'vw';
  enemyElem.style.bottom = enemy.y + 'vh';

  // Check for enemy proximity to player
  if (Math.abs(player.x - enemy.x) < 5 && Math.abs(player.y - enemy.y) < 5) {
    attackPlayer();
  }
}

// Player attack
attackButton.addEventListener('click', () => {
  if (Math.abs(player.x - enemy.x) < 5 && Math.abs(player.y - enemy.y) < 5) {
    enemy.health -= 10;
    enemyHealthBar.style.width = enemy.health + '%';
    
    if (enemy.health <= 0) {
      alert('You defeated the enemy!');
      resetEnemy();
    }
  }
});

// Attack player (if the enemy gets too close)
function attackPlayer() {
  player.health -= 2;
  healthBar.style.width = player.health + '%';
  
  if (player.health <= 0) {
    alert('Game Over! You were caught.');
    resetPlayer();
  }
}

// Enemy reset
function resetEnemy() {
  enemy.x = Math.floor(Math.random() * 80) + 10;
  enemy.y = Math.floor(Math.random() * 80) + 10;
  enemy.health = 100;
  enemyHealthBar.style.width = '100%';
}

// Reset player
function resetPlayer() {
  player.x = 50;
  player.y = 50;
  player.health = 100;
  healthBar.style.width = '100%';
}

// Main Game Loop
function gameLoop() {
  movePlayer();
  moveEnemy();
  
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
