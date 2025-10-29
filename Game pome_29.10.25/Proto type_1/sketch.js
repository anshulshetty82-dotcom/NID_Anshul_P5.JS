//game level array 
gameLevel = [0,1,2,3,4,5,6,7,8,9];

//current game level (zero is the intro screen, click to start)
currentgamelevel = gameLevel[0]; 

//game level switcher 
glNo = 0;

//player var x,y and speed in dir 
playerX = 0,
playerY = 0; 
playerSpeed = 20; 
playerSize = 50;


function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  //background(220);
  if(currentgamelevel == gameLevel[0]){
    introScreen();
  } else if (currentgamelevel == gameLevel[1]){
    levelOne();
  } else if (currentgamelevel == gameLevel[2]){
    levelTwo();
  } else if (currentgamelevel == gameLevel[3]){
    levelThree();
  }
}

//level content 

function introScreen(){
  background('BLACK');
}

function levelOne(){
  background('GREEN');
}

function levelTwo(){
  background('BLUE');
  groundPlane();
  playerSprite();
  playerMovement();
}

function levelThree(){
  background('RED');
  groundPlane();
  playerSprite();
  playerMovement();
}

//player sprite and movment 
function playerSprite(){
  fill('WHITE');
  rect(playerX,height/1.5,playerSize,playerSize);
}

function playerMovement(){
  if (keyIsDown(RIGHT_ARROW)){
    playerX = playerX + playerSpeed;
  } else if (keyIsDown(LEFT_ARROW)){
    playerX = playerX - playerSpeed;
  }

  if (playerX > width){
  glNo = glNo +1; 
  currentgamelevel = gameLevel[glNo];
  playerX = 0;
  }

  if (currentgamelevel == gameLevel[2] || playerX < 0){
    glNo = glNo;
    currentgamelevel == gameLevel[2];
    //playerX = 1;
  }
  
}

//world things 
function groundPlane(){
  fill('BLACK');
  rect(0,height/1.5+playerSize,width,height);
}

//start screen click condition 
function mouseClicked(){
if(currentgamelevel == gameLevel[0]){
  glNo = glNo + 1;
  currentgamelevel = gameLevel[glNo];
} else if (currentgamelevel == gameLevel[1]){
  glNo = glNo + 1;
  currentgamelevel = gameLevel[glNo];
}
}
