let noPetals = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES)
  //background(220);
}

function draw() {
  background(220);
  noFill()
  stroke(0)
  drawFlower(10,windowWidth/2,windowHeight/2)
  drawFlower(10,0,0)







  //ellipse(0,0,100,100)
}

function drawFlower(petals,x,y){
push();
  translate(x,y);
  for(let i=0; i < petals ;i=i+1){
    ellipse (80,0,90,50);
    rotate(360/petals)
    circle(0,0,70)
  }
  pop()

  
}