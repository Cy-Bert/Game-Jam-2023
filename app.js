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
    this.width = 32;
    this.height = 32;
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.position = {
      x: (world.width - this.width) / 2,
      y: world.height - this.height,
    };
  }

  draw() {
    c.fillStyle = "white";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  shoot(){
    missiles.push(new Missile({
        position:{
            x:this.position.w + this.width/2,
            y:this.position.y
        },
        velocity:{
            x:0,
            y:-5
        }
    }))
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
    this.draw();
  }
}

class Missile {
  constructor({ position }) {
    this.position = position;
    this.velocity = {x:0,y:-5};
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

const player = new Player();



// Boucle d'animation
const animationLoop = () => {
  requestAnimationFrame(animationLoop);
  c.clearRect(0, 0, world.width, world.height);
  player.update();
  missiles.forEach((missile,index) =>{
    if(missile.position.y + missile.height <=0){
        setTimeout(()=>{
            missiles.splice(index,1)
        }
        ,0)
    }
    else{missile.update();}
  })
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
    case " ":
      player.shoot();
      console.log(missiles);
  }
});
