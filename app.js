const world = document.querySelector("#gameBoard");
const c = world.getContext("2d");

world.width = world.clientWidth;
world.height = world.clientHeight;

let frames = 0;
const missiles = [];

const keys = {
  ArrowLeft: { pressed: false },
  ArrowRight: { pressed: false },
};

class Player {
  constructor() {
    this.width = 200;
    this.height = 200;
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.position = {
      x: (world.width - this.width) / 2,
      y: world.height - this.height,
    };
    
    this.image1 = new Image();
    this.image1.src = "Assets/image/tanuki_frame1.png";

    this.image2 = new Image();
    this.image2.src = "Assets/image/tanuki_frame2.png";

    this.currentImage = this.image1;
    this.imageIndex = 1;
    this.imageInterval = 10; // Intervalle pour alterner les images
    this.imageCounter = 0;
  }

  draw() {
    c.drawImage(this.currentImage, this.position.x, this.position.y, this.width, this.height);
  }

  animate() {
    this.imageCounter++;
    if (this.imageCounter >= this.imageInterval) {
      this.imageCounter = 0;
      this.imageIndex = (this.imageIndex === 1) ? 2 : 1; // Alterne entre 1 et 2
      this.currentImage = (this.imageIndex === 1) ? this.image1 : this.image2;
    }
  }

  update() {
    if (keys.ArrowLeft.pressed && this.position.x >= 0) {
      this.velocity.x = -10;
    } else if (
      keys.ArrowRight.pressed &&
      this.position.x <= world.width - this.width
    ) {
      this.velocity.x = 10;
    } else this.velocity.x = 0;
    this.position.x += this.velocity.x;
    this.animate(); // Appelle la méthode d'animation
    this.draw();
  }
}

class Missile {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.width = 3;
    this.height = 10;
  }

  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.position.y += this.velocity.y;
    this.draw();
  }
}

class Enemy {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.y += 2;
    this.draw();
  }
}

const player = new Player();
let enemies = [];

function generateEnemy() {
  const x = Math.random() * world.width;
  const y = -30;
  const width = 150;
  const height = 150;
  const color = "blue";

  const enemy = new Enemy(x, y, width, height, color);
  enemies.push(enemy);
}

setInterval(generateEnemy, 2000);

function gameLoop() {
  c.clearRect(0, 0, world.width, world.height);

  player.update();

  missiles.forEach((missile, index) => {
    if (missile.position.y + missile.height <= 0) {
      setTimeout(() => {
        missiles.splice(index, 1);
      }, 0);
    } else {
      missile.update();
    }
  });

  enemies.forEach((enemy, index) => {
    if (enemy.y > world.height) {
      enemies.splice(index, 1);
    } else {
      enemy.update();
    }
  });

  frames++;
  requestAnimationFrame(gameLoop);
}

gameLoop();

addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      break;
    case "ArrowRight":0
      keys.ArrowRight.pressed = true;
      break;
  }
});

addEventListener("keyup", ({ key }) => {
  switch (key) {
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case " ":
      player.shoot();
      console.log(missiles);
      break;
  }
});
