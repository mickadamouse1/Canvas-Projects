var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var cw = canvas.width;
var ch = canvas.height;

context.beginPath();
context.moveTo(cw/2, ch/2);
context.lineTo(600, ch - 20);
context.lineWidth = 15;
context.strokeStyle = "#f4f4f4";
context.lineCap = "round";
context.stroke();

context.beginPath();
context.moveTo(cw/2, ch/2);
context.lineTo(-370, ch + 10);
context.stroke();

context.beginPath();
context.moveTo(cw/2, ch/2);
context.lineTo(cw + 10, 75);
context.stroke();

context.beginPath();
context.moveTo(cw/2, ch/2);
context.lineTo(75, -10);
context.stroke();
