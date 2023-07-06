const world = document.querySelector("#gameBoard");
const c = world.getContext("2d");

world.width = world.clientWidth;
world.height = world.clientHeight;

let frames = 0;
const enemies = [];
const base_spawn = [-3, 0, 3];

const keys = {
  ArrowLeft: { pressed: false },
  ArrowRight: { pressed: false },
};

class Player {
  constructor() {
    this.width = 150;
    this.height = 150;
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.position = {
      x: (world.width - this.width) / 2,
      y: world.height - this.height,
    };

    this.image1 = new Image();
    this.image1.src = "Assets/Img/tanuki_frame1.png";

    this.image2 = new Image();
    this.image2.src = "Assets/Img/tanuki_frame2.png";

    this.currentImage = this.image1;
    this.imageIndex = 1;
    this.imageInterval = 10; // Intervalle pour alterner les images
    this.imageCounter = 0;
  }

  draw() {
    c.drawImage(
      this.currentImage,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  shoot() {
    enemies.push(
      new Enemy({
        position: {
          x: world.width / 2,
          y: world.height / 5,
        },
      })
    );
  }
  animate() {
    this.imageCounter++;
    if (this.imageCounter >= this.imageInterval) {
      this.imageCounter = 0;
      this.imageIndex = this.imageIndex === 1 ? 2 : 1; // Alterne entre 1 et 2
      this.currentImage = this.imageIndex === 1 ? this.image1 : this.image2;
    }
  }

  update() {
    if (keys.ArrowLeft.pressed && this.position.x >= world.width / 5) {
      this.velocity.x = -10;
    } else if (
      keys.ArrowRight.pressed &&
      this.position.x <= world.width - this.width - world.width / 5
    ) {
      this.velocity.x = 10;
    } else this.velocity.x = 0;
    this.position.x += this.velocity.x;
    this.animate(); // Appelle la méthode d'animation
    this.draw();
  }
}

class Enemy {
  constructor({ position }) {
    this.position = position;
    this.velocity = {
      x: base_spawn[Math.floor(Math.random() * base_spawn.length)],
      y: 5,
    };
    this.width = 3;
    this.height = 10;
  }
  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
    this.draw();
  }
}

const player = new Player();

let lifes = 1;
const lostLife = () => {
  lifes--;
  if (lifes <= 0) {
    alert("perdu");
    init();
  }
};

// Boucle d'animation
const animationLoop = () => {
  requestAnimationFrame(animationLoop);
  c.clearRect(0, 0, world.width, world.height);
  player.update();
  enemies.forEach((enemy, index) => {
    if (enemy.position.y >= world.height) {
      setTimeout(() => {
        enemies.splice(index, 1);
      }, 0);
    } else {
      enemy.update();
    }
    if (
      enemy.position.y + enemy.height >= player.position.y &&
      enemy.position.y <= player.position.y + player.height &&
      enemy.position.x >= player.position.x &&
      enemy.position.x + enemy.width <= player.position.x + player.width
    ) {
      enemies.splice(index, 1);

      lostLife();
    }
  });
  frames++;
};
animationLoop();

addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      console.log("gauche");
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      console.log("droite");
      break;
  }
});

addEventListener("keyup", ({ key }) => {
  switch (key) {
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      console.log("gauche");
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      console.log("droite");
      break;
    case " ":
      player.shoot();
      console.log(enemies);
  }
});
