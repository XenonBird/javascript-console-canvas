const xWidth = 2;
const rows = 30;
const cols = 30;
const vMax = 5;

const g = 1.5; // Gravititional accelaration
const r = 10; // ball radious

var h = rows / 2; // ball center position x
var k = cols / 2; // ball center position y
var vh = 1; // velocity towred x
var vk = 1; // velocity towred y

var map = [];

// CLEARING THE CANVAS

function clearCanvas() {
  console.clear();
  map = [];
  for (let i = 0; i < rows; i++) {
    var arr = [];
    for (let j = 0; j < cols; j++) {
      arr.push(` .`);
    }
    map.push(arr);
  }
}

// ACTIONS

function setRandomPosition() {
  h = Math.floor(Math.random() * cols);
  k = Math.floor(Math.random() * rows);
}

function setRandomVelocity() {
  vh = Math.random() * vMax * 2 - vMax;
  vk = Math.random() * vMax * 2 - vMax;
}

function addFreeMovement() {
  h += vh;
  k += vk;
}

function addGravity() {
  vk += g;
  k += vk;
}

function addBoundary() {
  if (h > cols) {
    h = cols;
    vh *= -0.95;
  }
  if (h < 0) {
    h = 0;
    vh *= -0.95;
  }
  if (k > rows) {
    k = rows;
    vk *= -0.95;
  }
  if (k < 0) {
    k = 0;
    vk *= -0.95;
  }
}


// DRAWING THE FRAME

function draw() {
  map.forEach((row, y) => {
    row.forEach((col, x) => {
      var equation = (x - h) * (x - h) + (y - k) * (y - k) < r * r;
      if (equation) {
        map[y][x] = "##";
      }
    });
  });
}

// ==========================================
//          PUT EVERYTHING TOGETHER
// ==========================================


function drawCanvas() {
  clearCanvas();
  addFreeMovement();
  addGravity();
  addBoundary();
  draw();
  console.log("(x,y) =", "(", Math.round(h), ",", Math.round(k), ")");

  map.forEach((arr) => console.log(arr.join("")));
  // setTimeout(drawCanvas, 100);
}

// ==========================================
//                  START
// ==========================================

setRandomPosition();
setRandomVelocity();
drawCanvas();
