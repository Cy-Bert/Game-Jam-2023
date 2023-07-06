const world = document.querySelector("#gameBoard");
const c = world.getContext("2d");

world.width = world.clientWidth;
world.height = world.clientHeight;

let frames = 0;
const enemies = [];
const base_spawn = [-3, 0, 3];
let acceleration = 0;

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
          x: world.width / 2 - 75,
          y: world.height / 5 - 75,
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

let base_enemy = [
  ["Assets/img/batty_frame1.png", "Assets/img/batty_frame2.png"],
  ["Assets/img/blobby_frame1.png", "Assets/img/blobby_frame2.png"],
  ["Assets/img/position1.png", "Assets/img/position2.png"],
  ["Assets/img/position_snake1.png", "Assets/img/position_snake_2.png"],
  ["Assets/img/monstre1.png","Assets/img/monstre2.png"]
];
let sprite = Math.floor(Math.random() * base_enemy.length);
class Enemy {
  constructor({ position }) {
    this.position = position;
    this.velocity = {
      x: base_spawn[Math.floor(Math.random() * base_spawn.length)],
      y: 5 + acceleration,
    };
    this.width = 150;
    this.height = 150;
    this.image1 = new Image();
    const sprite = Math.floor(Math.random() * base_enemy.length);
    this.image1.src =
      base_enemy[sprite][0];
    this.image2 = new Image();
    this.image2.src =
      base_enemy[sprite][1];

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
  animate() {
    this.imageCounter++;
    if (this.imageCounter >= this.imageInterval) {
      this.imageCounter = 0;
      this.imageIndex = this.imageIndex === 1 ? 2 : 1; // Alterne entre 1 et 2
      this.currentImage = this.imageIndex === 1 ? this.image1 : this.image2;
    }
  }
  update() {
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
    this.animate();
    this.draw();
  }
}

const player = new Player();

let lifes = 1;
const lostLife = () => {
  lifes--;
  if (lifes <= 0) {
    alert("perdu");
    location.reload();
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
  if (frames % 25 === 0) {
    player.shoot();
  }
  frames++;
};
animationLoop();

addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      break;
    case "ArrowRight":
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
  }
});
