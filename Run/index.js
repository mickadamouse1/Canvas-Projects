var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

///////////////////////////////////////////////////////////////

// ASSETS //

var assets = [];

var bkgd = new Image();
bkgd.src = "images/bkgd.png";

var runRight = new Image();
runRight.src = "spritesheet/runRight.png";

var runLeft = new Image();
runLeft.src = "spritesheet/runLeft.png";

var idle = new Image();
idle.src = "spritesheet/idleRight.png";

bkgd.onload = load();

runRight.onload = load();

runLeft.onload = load();

idle.onload = load();

function load() {
  assets.push("loaded");
  checkLoaded();
}

function checkLoaded() {
  if (assets.length === 3) {
    console.log("Loaded");
    startGame();
  }
}

function startGame() {

  // height 960px
  // width 9856px

  var keysDown = {};

  addEventListener("keydown", function(e) {
    keysDown[e.keyCode] = true;
  }, false);

  addEventListener("keyup", function(e) {
    delete keysDown[e.keyCode];
  }, false);

  var player = {
    x: 0,
    y: 368,
    scale: 10,
    width: 9856 / 11,
    height: 960,
    frameX: 0,
    sprite: runRight
  };

  function draw() {
    ctx.drawImage(bkgd, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(player.sprite, player.frameX, 0,
                  player.width, player.height,
                  player.x, player.y, player.width / player.scale, player.height / player.scale);
  }

  function update() {

    if (!(68 in keysDown) && !(65 in keysDown)) {
      player.sprite = idle;
      player.frameX += 1792/2;
      if (player.frameX >= 1792) player.frameX = 0;
    }

    if (68 in keysDown) {
      player.sprite = runRight;
      player.frameX += 896;
      if (player.frameX >= 9856) player.frameX = 0;
      player.x += 1.2;
    }

    if (65 in keysDown) {
      player.sprite = runLeft;
      player.frameX += 896;
      if (player.frameX >= 9856) player.frameX = 0;
      player.x -= 1.2;
    }

  }

  function run() {
    update();
    draw();

    requestAnimationFrame(run);
  }

  run();
}
