var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

let img = new Image();
img.src = "SS.png";
img.onload = function() {
  init();
}

function init() {
  context.drawImage(img, 0, 448*2, 448, 448, 0, 0, 200, 200);
}
