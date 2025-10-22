let spriteImage, sprites = [];
let spriteX = 10, spriteY = 7;
let count = 0;
let row = 0;
let x = 0, y = 0;
let xdir = 0, ydir = 0;
let k, l, m;
let capX = 0;


function preload() {

  spriteImage = loadImage('Images/g0.png');

}

function setup() {
  createCanvas(innerWidth, innerHeight);

  


  let w = spriteImage.width / spriteX;
  let h = spriteImage.height / spriteY;


  for (let i = 0; i < spriteY; i++) {

    sprites[i] = [];


    for (let j = 0; j < spriteX; j++) {

      sprites[i][j] = spriteImage.get(j * w, i * h, w, h);
    }
  }

}

function draw() {
  background("#ffffffff");
  fill("black")
  noStroke();
  rect(0,innerHeight/1.4,width,innerHeight);
  image(sprites[row][count], x, height/2,200,200);
  if (frameCount % 5 == 0) {
    count = (count + 1) % spriteX;
    x = x + xdir;
    y = y + ydir;
  }
}

function keyPressed() {
  if (keyIsDown(RIGHT_ARROW) && keyIsDown(UP_ARROW)) {
    row = 3;
    xdir = 14;
    ydir = 0;
  } else if (keyIsDown(LEFT_ARROW) && keyIsDown(UP_ARROW)) {
    row = 4;
    xdir = -14;
    ydir = 0;
  }  else if (keyCode == 65) {
    row = 5;
    xdir = 0;
    ydir = 0;
  } else if (keyCode == LEFT_ARROW) {
    row = 2;
    ydir = 0;
    xdir = -7;
  } else if (keyCode == RIGHT_ARROW) {
    row = 1;
    ydir = 0;
    xdir = 7;
  } else if (keyCode == 83) {
    row = 6;
    ydir = 0;
    xdir = 0;
  }
}
function keyReleased() {
  row = 0;
  xdir = 0;
  ydir = 0;
  count = frameCount % 12;
  capX = 10;

}