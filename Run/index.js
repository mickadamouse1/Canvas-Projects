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

//////////////////////////////////////////////////////////////////////////////////////////////////////

// Game Start Function //

function startGame() {

  //////////////////////////////////////////////////////////////////////////////////////////////////////

  // Key Event Recorder //

  var keysDown = {};

  addEventListener("keydown", function(e) {
    keysDown[e.keyCode] = true;
  }, false);

  addEventListener("keyup", function(e) {
    delete keysDown[e.keyCode];
  }, false);

  //////////////////////////////////////////////////////////////////////////////////////////////////////

  // Character Objects //

  var player = {
    x: 0,
    y: 368,
    scale: 10,
    width: 9856 / 11,
    height: 960,
    frameX: 0,
    sprite: runRight
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////

  // Graphics //

  function render() {
    ctx.drawImage(bkgd, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(player.sprite, player.frameX, 0,
                  player.width, player.height,
                  player.x, player.y, player.width / player.scale, player.height / player.scale);
  }

//////////////////////////////////////////////////////////////////////////////////////////////////////

  // Sets the movespeed of all key directions //
  var moveSpeed = 2;
  // checks if an animation is playing //
  var animating = false;

  function update() {
    // Key Controls //

    // If unassigned keys are pressed, only idle animation is played//
    if (!(68 in keysDown) && !(65 in keysDown)) {
      player.sprite = idle;
      if (!animating) animate(500);
    }

    // If "D" is pressed, run right animation is played//
    if (68 in keysDown) {
      if (player.sprite == idle) animating = false;
      player.sprite = runRight;
      player.x += moveSpeed;
      if (!animating) animate(52);
    }

    // If "A" is pressed, run left animation is played//
    if (65 in keysDown) {
      player.sprite = runLeft;
      player.x -= moveSpeed;
      if (!animating) animate(52);
    }

    // Screen Loop //
    if (player.x > canvas.width + 0) player.x = -60;
    if (player.x < -60) player.x = canvas.width + 0;

  }

  var timeouts = [];

  function animate(speed) {
    var frame = 896;
    animating = true;
    timeouts.push(setTimeout(function(){
      animating = false;
      for (var i = 0; i < timeouts.length; i++) {
        clearTimeout(timeouts[i]);
        timeouts = [];
      }
    }, speed));
    console.log(timeouts);
    player.frameX += frame;
    if (player.frameX >= player.sprite.width) player.frameX = 0;
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////

  // Animation Frame //
  // This runs as fast as the monitors refresh rate //

  function run() {
    update();
    render();

    requestAnimationFrame(run);
  }

  // Initiates the animation frame loop//
  run();
}
