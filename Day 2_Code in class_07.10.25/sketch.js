

function setup() {
  createCanvas(500, 500);
  background(220);
  let x = 0;
}

function draw() {
  //01 what happens if background is in the setup 
  //   also, using mouse x/y values as the variables. 
  //   to move, objects in the canvas. 
  //background(220);
  //rect(mouseX,mouseY,40,40);
  //ellipse(mouseX,mouseY,100,50);

  //02 using othe inbuit variables, 
  // a) mouse - x,y
  //ellipse(mouseX,mouseY,100,50);

  // b) frame count 
  //noStroke()
  //fill(random(0,255),random(0,255),random(0,255),random(0,255));
  //ellipse (random(0,500),random(0,500),100,50);
  
  // c) width of canvas
  //ellipseMode("center") 
  //fill("white")
  //ellipse(250,250,height/2,cos(frameCount/100)*300);
  //fill("red")
  //ellipse(250,250,20,20)
  //noStroke()
  //fill(mouseX/0.5,mouseY/2,mouseX/4);
  //ellipse(mouseX,mouseY,20,20);
  //ellipse(width-mouseX,mouseY,20,20);
  //ellipse(mouseX,height-mouseY,20,20);
  //ellipse(width-mouseX,height-mouseY,20,20);

  //animate our shapes - using variables 
  //ellipseMode("center")
  //ellipse(250,250,width,height);
  //ellipseMode("center");
  //ellipse(250,250,sin(frameCount/100)*500,sin(frameCount/100)*500);

  ellipse(x ,100,100,50);


  

}
