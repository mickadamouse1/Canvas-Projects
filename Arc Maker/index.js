var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var x = canvas.width / 2;
var y = canvas.height / 2;

var xp = canvas.width / 2;
var yp = canvas.height / 2;
var radius = 50;
var startAngle = 1.1;
var endAngle = 2;
var counterClockwise = true;
var lineWidth = 10;

var arrInputs = [inputXPos, inputYPos, inputRadius, inputStartAngle, inputEndAngle, inputLineWidth];
var arrInputValues = [xp, yp, radius, startAngle, endAngle, lineWidth];
for (var i = 0; i < arrInputs.length; i++) {
  arrInputs[i].value = arrInputValues[i];
  arrInputs[i].addEventListener("input", updateGraphics);
}

function draw() {
  context.beginPath();
  context.arc(xp, yp, radius, startAngle, endAngle, counterClockwise);
  context.lineWidth = lineWidth;
  context.strokeStyle = "#f4f4f4";
  context.stroke();
}

function updateGraphics() {
  clear();
  xp = inputXPos.value;
  yp = inputYPos.value;
  radius = inputRadius.value;
  startAngle = inputStartAngle.value;
  endAngle = inputEndAngle.value;
  lineWidth = inputLineWidth.value;
  updateText();
  draw();
}

function clear() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function updateText() {
  if (counterClockwise) {
    txtClockwise.innerHTML = "True";
  } else {
    txtClockwise.innerHTML = "False";
  }

  if (xp == canvas.width / 2 && yp == canvas.height / 2) {
    txtCentered.innerHTML = "True";
  } else {
    txtCentered.innerHTML = "False";
  }
}

btnCenter.onclick = function() {
  inputXPos.value = canvas.width / 2;
  inputYPos.value = canvas.height / 2;
  updateGraphics();
}

btnClockwise.onclick = function() {
  if (counterClockwise) {
    counterClockwise = false;
  } else {
    counterClockwise = true;
  }
  updateGraphics();
}

draw();
