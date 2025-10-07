function setup() {
  createCanvas(500, 500);
}

function draw() {
  noStroke();
  background('#cfe2f5ff');

  //face
  fill(mouseX/3, 249, 166);
  ellipse(250,250,300,300);

  //eyes
  fill(mouseX/3, 33, 32);
  ellipse(180,210,15,20);
  ellipse(width-180,210,15,20);

  //cheeks
  fill(241, 180, 225,mouseX/5);
  ellipse(180,300,40,40);
  ellipse(width-180,300,40,40);

  //mouth 
  fill("black");
  ellipse(250,320,mouseX/50,20);


}
