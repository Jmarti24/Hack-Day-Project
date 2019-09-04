// const scoreboard = document.getElementById('scoreboard');

//Parent object for sprites
class Populate {
  constructor () {
    this.x = 0;
    this.y = 0;
    this.speed = 0;
    this.sprite = "";
    this.sideways = 101;
    this.upDown = 83;
  }

  render () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  reset () {
    this.x = 0;
    this.y = 415;
  }
}

class Collectable extends Populate {
    constructor () {
    super();
    this.x = 200;
    this.y = 200;
    this.sprite = "images/Gem-Green.png";
  }
    update () {


  }
}

//Player class
class Player extends Populate {

  constructor () {
    super();
    this.x = 0;
    this.y = 415;
    this.score = 0;
    this.health = 3;
    this.sprite = "images/char-pink-girl_gasmask.png";
  }



//key input for Player
  handleInput (input) {
    switch (input) {
      case "left":
        if (this.x >= this.sideways) {
          this.x -= this.sideways;
        }
        break;
      case "right":
        if (this.x <= this.sideways * 3) {
          this.x += this.sideways;
        }
        break;
      case "up":
        if (this.y >= 83) {
          this.y -= this.upDown;
        }
        break;
      case "down":
        if (this.y <= this.upDown * 4) {
          this.y += this.upDown;
        }
        break;
    }
  }

  //updates player and sets condition for collision & win
  update () {
    if (60 > Math.abs(this.y - collectable.y) && 60 > Math.abs(this.x - collectable.x)) {
        collectable.y = Math.random() * (425 - 0) + 1;
        collectable.x = Math.random() * (425 - 0) + 1;
        this.score += 1;
        if(this.score >= 10)
        {
            alert("You saved " + this.score + " babies!");
            window.location.reload(true);
        }
    }
    for (let enemy of allEnemies) {
      if (this.y === enemy.y && (enemy.x + enemy.sideways / 2 > this.x && enemy.x < this.x + this.sideways / 2)) {
        this.health -= 1;
        if (this.health === 0) {
          alert("Done did die!!");
          window.location.reload(true);
        }
        alert("You lost a life! You have " + this.health + " left!");
        this.reset();
      }
    }
  }
}

const player = new Player();
const collectable = new Collectable();

//Array to hold Enemy objects
const allEnemies = [];



// scoreboard code - FOR VERSION 2.0
// function myFunction() {
//   scoreboard.innerHTML = "You\'ve collected " + this.score + " out of 10. You have " + this.health + " health left!";
// }


//Enemy class
class Enemy extends Populate {
  constructor (x, y, speed) {
    super();
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = "images/enemy-bug-green.png";
    this.enemySprite = this.sprite;
  }

  //Smooth movement of Enemy objects across gameboard
  update (dt) {
    if (this.x < this.sideways * 5) {
      this.x += this.speed * dt;
    } else {
      this.x = -100;
    }
  }
}

const enemy1 = new Enemy(101, 83, 150);
const enemy2 = new Enemy(404, 166, 150);
const enemy3 = new Enemy(0, 249, 200);
const enemy4 = new Enemy(0, 83, 100);
const enemy5 = new Enemy(0, 332, 100);

allEnemies.push(enemy1, enemy2, enemy3, enemy4, enemy5);

// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function (e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

//testing
