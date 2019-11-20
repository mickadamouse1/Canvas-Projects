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
    animating: false
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
  var previousAnimation = idleRight;

  function update() {
    // Key Controls //

    // If unassigned keys are pressed, only idleRight animation is played//
    // IDLE RIGHT //
    if (!(68 in keysDown) && !(65 in keysDown)) {
      if (player.sprite == runRight) {
        player.animating = false;
        player.frameX = 0;
      }
      player.sprite = idleRight;
      if (!player.animating) animate(1000);
    }

    // IDLE LEFT //

    // if (!(68 in keysDown) && !(65 in keysDown)) {
    //   if (player.sprite == runLeft) player.animating = false;
    //
    // }

    // If "D" is pressed, run right animation is played//
    if (68 in keysDown) {
      if (player.sprite == idleRight) {
        player.animating = false;
        player.frameX = 0;
      }
      previousAnimation = runRight;
      player.sprite = runRight;
      player.x += moveSpeed;
      if (!player.animating) animate(52);
    }

    // If "A" is pressed, run left animation is played//
    if (65 in keysDown) {
      if (player.sprite == idleRight) player.animating = false;
      previousAnimation = runLeft;
      player.sprite = runLeft;
      player.x -= moveSpeed;
      if (!player.animating) animate(52);
    }

    // Screen Loop //
    if (player.x > canvas.width + 0) player.x = -60;
    if (player.x < -60) player.x = canvas.width + 0;

  }

  var timeouts = [];
  var id = window.setTimeout(function() {}, 0);

  function animate(speed) {
    var frame = 896;
    player.animating = true;
    timeouts.push(setTimeout(function(){
      clearTimeouts();
      player.animating = false;

    }, speed));
    // console.log(keysDown);
    player.frameX += frame;
    if (player.frameX >= player.sprite.width) player.frameX = 0;
  }

  function clearTimeouts() {
    for (var i = 0; i <= timeouts.length; i++) {
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

  setInterval(function() {
    timeouts = [];
  }, 1000);
}
