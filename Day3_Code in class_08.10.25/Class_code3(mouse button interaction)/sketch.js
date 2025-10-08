let x;
function setup() {
  createCanvas(400, 400);
  x=0;
}

function draw() {
  fill(x,230,100)
  background(220);
  rect(200,200,50,50)
  if(mouseX>200 && mouseX<250 && mouseY > 200 && mouseY <250){
    x = x+200
  }else{
    x=0
  }
}
