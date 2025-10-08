let size;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
}

function draw() {
  size = random(50,100);

  
   
  //understand the random condition, after class!!!
}

function mousePressed(){
    drawSnowman(mouseX,mouseY);
  }

function drawSnowman(x,y){
  noStroke()
  fill("#ddf0f8ff")
  ellipse(x,y,size,size);
  fill("#87acbbff")
  ellipse(x,y-size/2,size/2,size/2);
}


