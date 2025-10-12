//global variables on the game state. 
let gameState = 'INTRO';
let currentLevel = 1;


let g0;
let xdir = 0, ydir = 0;
let postionx = 0;

function preload(){

g0 = loadImage("Images/g0.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  postionx = width/2;
}

function draw() {

  background(220);
  //back ground image 
  image(g0,0,0,windowWidth,windowHeight);

  //ground plane 
  fill("black");
  rect(0,height/1.64,windowWidth,windowHeight);

  //key press, if statements
  if (keyIsDown(RIGHT_ARROW)){
    xdir = 6;
  } else if(keyIsDown(LEFT_ARROW)){
    xdir = -6; 
  } else{
    xdir = 0;
  }

  //change postiiton x variable, based on the if statement, 
  postionx = postionx+xdir;
   


   //Rect char prototype. 
  fill("white");
  //drawingContext.shadowBlur = 100;
  //drawingContext.shadowColor = (255,255,255);
  rect(postionx,height/1.8,50,50,2)

  


}




