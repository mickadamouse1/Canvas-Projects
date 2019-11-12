var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

///////////////////////////////////////////////////////////////

// GRAPHICS //

// Background Image
var bkgd = new Image();
bkgd.src = "images/bkgd.png";

// Player Sprite
var playerSprite = new Image();
playerSprite.src = "spritesheet/player.png";

// Goblin Sprite
var goblinSprite = new Image();
goblinSprite.src = "spritesheet/goblins.png";

var assets = {
  bkgd: false,
  player: false,
  goblin: false
};

// LOADING PROGRESS //

var loaded = false;

bkgd.onload = function() {
  assets.bkgd = true;
  checkLoaded();
}

playerSprite.onload = function() {
  assets.player = true;
  checkLoaded();
}

goblinSprite.onload = function() {
  assets.goblin = true;
  checkLoaded();
}

function checkLoaded() {
  if (assets.bkgd == true
      && assets.player == true
      && assets.goblin == true
  ) {
    loaded = true;
    console.log("loaded.");
  } else {
    console.log("Loading~");
  }
}

///////////////////////////////////////////////////////////////

// GAME OBJECTS //

var player = {
  speed: 256, // pixels per second
  x: 0,
  y: 0
};

var goblin = {
  x: 0,
  y: 0
};

var caught = 0;

///////////////////////////////////////////////////////////////

// CONTROLS //

var keysDown = {};

addEventListener("keydown", function(e){
  keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e){
  delete keysDown[e.keyCode];
}, false);

///////////////////////////////////////////////////////////////

// Game Reset //

var reset = function() {
  player.x = canvas.width / 2;
  player.y = canvas.height / 2;

  goblin.x = mathRandom(600);
  goblin.y = mathRandom(600);
}

///////////////////////////////////////////////////////////////

// UPDATE GAME STATE //

var update = function(modifier) {
  if (38 in keysDown) player.y -= player.speed * modifier; // UP
  if (40 in keysDown) player.y += player.speed * modifier; // DOWN
  if (37 in keysDown) player.x -= player.speed * modifier; // LEFT
  if (39 in keysDown) player.x += player.speed * modifier; // RIGHT

  if (player.x <= (goblin.x + 32)
      && goblin.x <= (player.x + 32)
      && player.y <= (goblin.y + 32)
      && goblin.y <= (player.y + 32)
    ) {
      ++caught;
      reset();
  }
}

///////////////////////////////////////////////////////////////

// RENDER GRAPHICS //

var render = function() {

}

///////////////////////////////////////////////////////////////

// OPTIMISATION TOOLS //

function mathRandom(max) {
  return Math.ceil(Math.random() * max);
  console.log(Math.ceil(Math.random() * max));
}
