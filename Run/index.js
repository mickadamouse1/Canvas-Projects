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

var idleRight = new Image();
idleRight.src = "spritesheet/idleRight.png";

var idleLeft = new Image();
idleLeft.src = "spritesheet/idleLeft.png"

bkgd.onload = load();
runRight.onload = load();
runLeft.onload = load();
idleRight.onload = load();
idleLeft.onload = load();

function load() {
  assets.push("loaded");
  checkLoaded();
}

function checkLoaded() {
  if (assets.length === 5) {
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
    sprite: runRight,
    animating: false,
    moveSpeed: 2
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

  // checks if an animation is playing /

  var timeouts = [];

  function update() {
    // Key Controls //

    // IDLE //
    if (!(68 in keysDown) && !(65 in keysDown)) {
      if (player.sprite == runRight || player.sprite == runLeft) {
        player.animating = false;
        player.frameX = 896;
        if (player.sprite == runRight) player.sprite = idleRight;
        if (player.sprite == runLeft) player.sprite = idleLeft;
      }
      if (!player.animating) {
        animate(500);
      }
    }

    // RUN RIGHT //
    if (68 in keysDown) {
      if (player.sprite == idleRight || player.sprite == idleLeft) {
        player.animating = false;
        player.frameX = runRight.width;
      }
      player.sprite = runRight;
      player.x += player.moveSpeed;
      if (!player.animating) animate(52);
    }

    // RUN LEFT //
    if (65 in keysDown) {
      if (player.sprite == idleRight || player.sprite == idleLeft) {
        player.animating = false;
        player.frameX = runLeft.width;
      }
      player.sprite = runLeft;
      player.x -= player.moveSpeed;
      if (!player.animating) animate(52);
    }

    // Screen Loop //
    if (player.x > canvas.width + 0) player.x = -60;
    if (player.x < -60) player.x = canvas.width + 0;

  }

  function animate(speed) {
    var frame = 896;
    player.animating = true;
    clearTimeouts();

    timeouts.push(setTimeout(function(){
      player.animating = false;
      console.log(speed);
    }, speed));

    player.frameX += frame;
    if (player.frameX >= player.sprite.width) player.frameX = 0;
  }

  function clearTimeouts() {
    for (var i = 0; i < timeouts.length; i++) {
      clearTimeout(timeouts[i]);
    }
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

  //////////////////////////////////////////////////////////////////////////////////////////////////////

  // OPTIMISATION TOOLS //
}
