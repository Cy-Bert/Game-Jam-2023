// const world = document.querySelector("#gameBoard");
// const c = world.getContext("2d");

// world.width = world.clientWidth;
// world.height = world.clientHeight;

// let frames = 0;
// const enemies = [];

// const keys = {
//   ArrowLeft: { pressed: false },
//   ArrowRight: { pressed: false },
// };

// class Player {
//   constructor() {
//     this.width = 32; // Largeur du player
//     this.height = 32; // Hauteur du player
//     this.velocity = {
//       x: 0, // Vitesse de déplacement sur l'axe des X
//       y: 0, // Vitesse de déplacement sur l'axe des Y
//     };

//     this.image = new Image();
//     this.image.src = "Assets/Img/space.png";
//     this.image.onload = () => {
//       this.width = 48;
//       this.height = 48;
//       this.position = {
//         x: world.width / 2 - this.width / 2,
//         y: world.height - this.height - 10,
//       };
//       this.draw(); // Call draw() after the image is loaded
//     };
//   }

//   draw() {
//     c.drawImage(
//       this.image,
//       this.position.x,
//       this.position.y,
//       this.width,
//       this.height
//     );
//   }

//   update() {
//     if (this.image) {
//       if (keys.ArrowLeft.pressed && this.position.x >= 0) {
//         this.position.x -= 5; // Update the position by subtracting from x
//       } else if (
//         keys.ArrowRight.pressed &&
//         this.position.x <= world.width - this.width
//       ) {
//         this.position.x += 5; // Update the position by adding to x
//       }
//       this.draw();
//     }
//   }
// }

// const base_spawn = [-5, -2, 0, 2, 5];

// // const base_enemy = [[Frame1, Frame2]];
// // let enemy_sprite = Math.floor(Math.random() * base_enemy.length);
// class Enemy {
//   constructor() {
//     this.position = { x: world.width / 2, y: world.height / 4 };
//     this.velocity = {
//       x: base_spawn[Math.floor(Math.random() * base_spawn.length)],
//       y: 5,
//     };
//     this.width = 3;
//     this.height = 10;
//     // const image = new Image();
//     // image.src = "Assets/Img/ghost.png";
//     // image.onload = () => {
//     //   this.image = image;
//     //   this.width = 48;
//     //   this.height = 48;
//     //   this.position = {
//     //     x: world.width / 2 - this.width / 2,
//     //     y: world.height - this.height - 10,
//     //   };
//     // };
//   }
//   draw() {
//     c.fillStyle = "red";
//     c.fillRect(this.position.x, this.position.y, this.width, this.height);
//   }
//   update() {
//     this.position.y += this.velocity.y;
//     this.draw();
//   }
//   shoot() {
//     enemies.push(new Enemy());
//   }
// }

// const player = new Player();

// // Boucle d'animation
// const animationLoop = () => {
//   requestAnimationFrame(animationLoop);
//   c.clearRect(0, 0, world.width, world.height);
//   player.update();
//   enemies.forEach((enemy, index) => {
//     if (enemy.position.y <= 0) {
//       setTimeout(() => {
//         enemies.splice(index, 1);
//       }, 0);
//     } else {
//       enemy.update();
//     }
//   });
//   frames++;
// };
// animationLoop();

// addEventListener("keydown", (event) => {
//   switch (event.key) {
//     case "ArrowLeft":
//       keys.ArrowLeft.pressed = true;
//       break;
//     case "ArrowRight":
//       keys.ArrowRight.pressed = true;
//       break;
//   }
// });

// addEventListener("keyup", (event) => {
//   switch (event.key) {
//     case "ArrowLeft":
//       keys.ArrowLeft.pressed = false;
//       break;
//     case "ArrowRight":
//       keys.ArrowRight.pressed = false;
//       break;
//   }
// });

const world = document.querySelector('#gameBoard');
const c = world.getContext('2d');

world.width = world.clientWidth;
world.height = world.clientHeight;

let frames=0;
const missiles =[];
const base_spawn = [-6, -3, 0, 3, 6];

const keys = {
    ArrowLeft:{   pressed:false   },
    ArrowRight:{pressed:false  },  
 }
 

class Player{
    constructor(){
        this.width=32; // Largeur du player
        this.height=32; // Hauteur du player
        this.velocity={
            x:0, // Vitesse de déplacement sur l'axe des X
            y:0 // Vitesse de déplacement sur l'axe des Y
        }
       
        const image= new Image();
        image.src = 'Assets/Img/space.png';
        image.onload =()=>{
            this.image = image;
            this.width=48;
            this.height=48;
            this.position={
                x:world.width/2 - this.width/2,
                y:world.height - this.height -10
            }
           
        }
    }

    draw(){
        
        c.drawImage(this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height,
        );
	}

    shoot(){
        missiles.push(new Missile({
            position:{
                x:world.width/2,
                y:world.height/4
            },
            
        }));
    }
  
   
    update(){
        if(this.image){
			if(keys.ArrowLeft.pressed && this.position.x >=0){
				this.velocity.x = -5;
			}
			else if(keys.ArrowRight.pressed && this.position.x <= world.width - this.width){
				this.velocity.x = 5;
			}
			else{this.velocity.x =0;}
        this.position.x += this.velocity.x;
        this.draw();
		}
	}
}  

class Missile{
    constructor({position}){
        this.position = position;
        this.velocity ={x:base_spawn[Math.floor(Math.random() * base_spawn.length)],y:5} ;
        this.width = 3;
        this.height =10;
        
    }
    draw(){
        c.fillStyle='red';
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
      
   
    }
    update(){
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        this.draw();
    }
}



const player = new Player();



// Boucle d'animation
const animationLoop= ()=>{
    requestAnimationFrame(animationLoop);
    c.clearRect(0,0,world.width,world.height);
    player.update();
    missiles.forEach((missile,index) =>{
        if(missile.position.y + missile.height <=0) { 
            setTimeout(() =>{
                missiles.splice(index,1)} 
				,0)}
        else{missile.update();}
    }) 
   frames++;
    
}
animationLoop();


addEventListener('keydown',({key})=>{
    
    switch(key){
    case 'ArrowLeft':
             keys.ArrowLeft.pressed = true;
             console.log('gauche');
             break;
         case 'ArrowRight':
             keys.ArrowRight.pressed = true;
             console.log('droite');
             break;
         } 
 })    
      

addEventListener('keyup',({key})=>{
        switch(key){
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = false;
                console.log('gauche');
                break;
            case 'ArrowRight':
                keys.ArrowRight.pressed = false;
                console.log('droite');
                break;
            case ' ':
                player.shoot();
                console.log(missiles)
        }
         
    })




