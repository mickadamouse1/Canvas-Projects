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
    reset();
    render();
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

  goblin.x = mathRandom(canvas.width - 50);
  goblin.y = mathRandom(canvas.height - 50);
}

///////////////////////////////////////////////////////////////

// UPDATE GAME STATE //

var update = function(modifier) {
  if (87 in keysDown) player.y -= player.speed * modifier; // UP
  if (83 in keysDown) player.y += player.speed * modifier; // DOWN
  if (65 in keysDown) player.x -= player.speed * modifier; // LEFT
  if (68 in keysDown) player.x += player.speed * modifier; // RIGHT

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
  var scale = 2;
  var playerWidth = playerSprite.width / 4;
  var playerHeight = playerSprite.height / 4;

  var goblinWidth = goblinSprite.width / 12;
  var goblinHeight = goblinSprite.height / 8;
  var goblinScale = 1.25;

  // Player scale - 512x512
  // Goblin scale - 576x384

  if (loaded) {
    ctx.drawImage(bkgd, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(playerSprite, 0, 0, playerWidth, playerHeight, player.x, player.y, playerWidth / scale, playerHeight / scale);
    ctx.drawImage(goblinSprite, 0, 0, goblinWidth, goblinHeight, goblin.x, goblin.y, goblinWidth * goblinScale, goblinHeight * goblinScale);
  }

  ctx.fillStyle = "rgb(255,255,255)";
  ctx.font = "bold 30px sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(`Goblins Caught: ${caught}`, 10, 10);
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.strokeText(`Goblins Caught: ${caught}`, 10, 10);
}

///////////////////////////////////////////////////////////////

// GAME LOOP

var main = function() {
  var now = Date.now();
  var delta = now - then;

  update(delta / 1000);
  render();

  then = now;
  console.log("then:" + delta);
  requestAnimationFrame(main);
}

///////////////////////////////////////////////////////////////

// OPTIMISATION TOOLS //

function mathRandom(max) {
  return Math.ceil(Math.random() * max);
  console.log(Math.ceil(Math.random() * max));
}


var then = Date.now();
reset();
main();
