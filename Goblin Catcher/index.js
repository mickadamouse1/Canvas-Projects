window.addEventListener('load', () => {
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
    y: 0,
    scale: 2,
    width: playerSprite.width / 4,
    height: playerSprite.height / 4,
    frameX: 0,
    frameY: 0
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
    if (player.x === 0) player.x = canvas.width / 2;
    if (player.y === 0) player.y = canvas.height / 2;
  
    goblin.x = mathRandom(canvas.width - 50);
    goblin.y = mathRandom(canvas.height - 50);
  }
  
  ///////////////////////////////////////////////////////////////
  
  // UPDATE GAME STATE //
  
  var animating = false;
  
  var update = function(modifier) {
    if (Object.keys(keysDown).length == 2) {
      if (87 in keysDown && 68 in keysDown) { // NORTH EAST
        selectAnimation(3);
        player.y -= player.speed * (modifier / 1.3);
        player.x += player.speed * (modifier / 1.3);
      }
      if (83 in keysDown && 68 in keysDown) { // SOUTH EAST
        selectAnimation(3);
        player.y += player.speed * (modifier / 1.3);
        player.x += player.speed * (modifier / 1.3);
      }
      if (65 in keysDown && 87 in keysDown) { // NORTH WEST
        selectAnimation(2);
        player.y -= player.speed * (modifier / 1.3);
        player.x -= player.speed * (modifier / 1.3);
      }
      if (65 in keysDown && 83 in keysDown) { // SOUTH WEST
        selectAnimation(2);
        player.y += player.speed * (modifier / 1.3);
        player.x -= player.speed * (modifier / 1.3);
      }
    } else if (Object.keys(keysDown).length == 1) {
      if (87 in keysDown) {
        selectAnimation(4);
        player.y -= player.speed * modifier; // UP
      }
      if (83 in keysDown) {
        selectAnimation(1);
        player.y += player.speed * modifier; // DOWN
      }
      if (65 in keysDown) {
        player.x -= player.speed * modifier; // LEFT
        selectAnimation(2)
      }
      if (68 in keysDown) {
        player.x += player.speed * modifier; // RIGHT
        selectAnimation(3);
      }
    } else {
      player.frameX = 0;
      player.frameY = 0;
    }
  
  
    // console.log(player.x);
    if (player.x < -60) player.x = 600;
    if (player.x > 600) player.x = -60;
    if (player.y < -60) player.y = 600;
    if (player.y > 600) player.y = -60;
  
    if (player.x <= (goblin.x + 32)
        && goblin.x <= (player.x + 32)
        && player.y <= (goblin.y + 32)
        && goblin.y <= (player.y + 32)
      ) {
        ++caught;
        reset();
    }
  }
  
  function selectAnimation(anim) {
    if (!animating) {
      animating = true;
      setTimeout(function(){
        animating = false;
      }, 100);
      switch(anim) {
        case 1:
          player.frameY = 0;
          break;
        case 2:
          player.frameY = 128;
          break;
        case 3:
          player.frameY = 128 * 2;
          break;
        case 4:
          player.frameY = 128 * 3;
          break;
      }
      player.frameX += 128;
      if (player.frameX >= 512) player.frameX = 0;
    }
  }
  
  ///////////////////////////////////////////////////////////////
  
  // RENDER GRAPHICS //
  
  var render = function() {
    var goblinWidth = goblinSprite.width / 12;
    var goblinHeight = goblinSprite.height / 8;
    var goblinScale = 1.25;
  
    // Player scale - 512x512
    // Goblin scale - 576x384
  
    if (loaded) {
      ctx.drawImage(bkgd, 0, 0, canvas.width, canvas.height);
      drawFrame();
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
  
  function drawFrame() {
    ctx.drawImage(playerSprite, player.frameX, player.frameY,
                  player.width, player.height,
                  player.x, player.y,
                  player.width / player.scale, player.height / player.scale,);
  }
  
  ///////////////////////////////////////////////////////////////
  
  // GAME LOOP
  
  var main = function() {
    var now = Date.now();
    var delta = now - then;
  
    update(delta / 1000);
    render();
  
    then = now;
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
});


