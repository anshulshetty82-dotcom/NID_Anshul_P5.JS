let petalCount = 10;
let flowerX,flowerY;
//let x,y;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  flowerX = width/2;
  flowerY = height/2;
  //x=0;
  //y=0;
  //background(220);
}

function draw() {
  background(220);

  drawFlower(petalCount,flowerX,flowerY, frameCount)



}

function mousePressed(){
  flowerX=mouseX;
  flowerY=mouseY;

}

function drawFlower(petalCount,x,y,rotationAngle){

  push()
  translate(x,y)
  rotate(rotationAngle);
  for(let i=0;i<petalCount;i=i+1){
    ellipse(75,0,100,50);
    rotate(360/petalCount);
    circle(0,0,50)
  }
  pop()
}
