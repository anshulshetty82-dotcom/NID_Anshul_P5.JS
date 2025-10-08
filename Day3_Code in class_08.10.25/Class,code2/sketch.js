function setup() {
  createCanvas(400, 400);
  background(220);
}

function draw() {
  
  
}

function mousePressed(){
  if(mouseY < height/2){
    noStroke()
    fill("#ddf0f8ff")
    ellipse(mouseX,mouseY,50,50);
  } else{
    fill("#adfb9bff")
    rect(mouseX,mouseY,50,50);
  }
}
