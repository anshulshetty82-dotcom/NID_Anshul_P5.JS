//game level array 
let gameLevel = [0,1,2,3,4,5,6,7,8,9];

//level 2 bg firefly array 
let firefly = []
let fireflycount = 150;

//current game level (zero is the intro screen, click to start)
let currentgamelevel = gameLevel[0]; 

//game level switcher 
let glNo = 0;

//player var x,y and speed in dir 
playerX = 0,
playerY = 0; 
playerSpeed = 20; 
playerSize = 50;

//bg image 
let bgl1;
let bgl3point1;
let bgl3point2;
let bgl4;

//world images 
let bgwl1;

function preload(){
  bgl1 = loadImage("images/1.png");
  bgwl1 = loadImage("images/3.png");
  bgl3point1 = loadImage("images/4.png");
  bgl3point2 = loadImage("images/5.png");
  bgl4 = loadImage("images/6.png");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  //level 2 flire fly storing array 
  for(let i=0; i<fireflycount;i++){
    firefly.push({
      x:random(width),
      y:random(height),
      speed:random(1,20),
      jitter:random(1,2),
    })
  }
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
  } else if (currentgamelevel == gameLevel[4]){
    levelFour();
  } else if (currentgamelevel == gameLevel[5]){
    levelFive();
  } else if (currentgamelevel == gameLevel[6]){
    levelSix();
  }
}

//level content 
function introScreen(){
  background('BLACK');
}

function levelOne(){
  
  //narative text 
  fill(255,255,255)
  textAlign(CENTER)
  textSize(50)
  textFont('The Sad Train')
  text("I find myself longing, in search of that night,",width/2,height/2)
  noFill();

  //UI text 
  fill(150)
  textAlign(CENTER)
  textSize(30)
  textFont('The Sad Train')
  text("Press Enter to continue...",width/1.12,height/1.1)
  noFill();

  if (keyIsDown(13)){
  glNo = glNo + 1;
  currentgamelevel = gameLevel[glNo];
  }
}

function levelTwo(){
  //image background
  background('BLACK');
  // fireflies bg in the background for loop 
  fill('YELLOW')
  for (let i=0; i<firefly.length; i++){
    let fly = firefly[i];
    let jitterX = fly.x + random(-fly.jitter,fly.jitter);
    let jitterY = fly.y + random(-fly.jitter,fly.jitter);
    let flyradius = sin(fly.speed)*frameCount%5;

    circle(jitterX,jitterY,flyradius);
  }
  
  //world asset on ground plane 
  let newcalculation = height/1.5+ playerSize;
  let imageonground = newcalculation-bgwl1.height;
  image(bgwl1,50,imageonground);

  groundPlane();
  playerSprite();
  playerMovement();

  //text things 
  if (playerX > 10  && playerX < width/2){
    
    let tr = map(playerX,0,width/2,0,255);
    textAlign(CENTER);
    fill(255,255,255,tr);
    textSize(40);
    //strokeWeight(40);
    textFont('The Sad Train');
    text("The dark sky glimmering with specks of light,", width/2,height/1.18);
    text("In harmony they shimmer, swaying to the rhythm of the night,", width/2,height/1.13);

  } 
    if (playerX > width/2 && playerX < width){
    let tr = map(playerX,width/2,width,0,255);
    textAlign(CENTER);
    fill(225,225,225,tr);
    textSize(40);
    text("My whiskers relaxed, to the joy that unfolded through the light.",  width/2,height/1.18);
    }

}

function levelThree(){
  //back ground change 
  if(playerX < width/2){
  let newcalculation = height/1.5+ playerSize;
  image(bgl3point1,0,0,width,newcalculation)
  } else if(playerX > width/2) {
    let newcalculation = height/1.5+ playerSize;
    image(bgl3point2,0,0,width,newcalculation)
  }

  groundPlane();
  playerSprite();
  playerMovement();

    //text things 
  if (playerX > 10  && playerX < width/2){
    
    let tr = map(playerX,0,width/2,0,255);
    textAlign(CENTER);
    fill(255,255,255,tr);
    textSize(40);
    //strokeWeight(40);
    textFont('The Sad Train');
    text("Oh !, these skies are no more to see,", width/2,height/1.18);
    //text("In harmony they shimmer, swaying to the rhythm of the night,", width/2,height/1.13);

  } 
    if (playerX > width/2 && playerX < width){
    let tr = map(playerX,width/2,width,0,255);
    textAlign(CENTER);
    fill(225,225,225,tr);
    textSize(40);
    text("My parents are back to their lives as bee’s,",  width/2,height/1.18);
    }
 
}

function levelFour(){

  if(playerX < width/2){
  let newcalculation = height/1.5+ playerSize;
  image(bgl4,0,0,width,newcalculation)
  } else if(playerX > width/2) {
    let newcalculation = height/1.5+ playerSize;
    image(bgl4,0,0,width,newcalculation)
  }

  groundPlane();
  playerSprite();
  playerMovement();

  if (playerX > 10  && playerX < width/2){
    
    let tr = map(playerX,0,width/2,0,255);
    textAlign(CENTER);
    fill(255,255,255,tr);
    textSize(40);
    //strokeWeight(40);
    textFont('The Sad Train');
    text("Amidst my mundane life, a day of joy and innocence flamed,", width/2,height/1.18);
    //text("In harmony they shimmer, swaying to the rhythm of the night,", width/2,height/1.13);

  } 
    if (playerX > width/2 && playerX < width){
    let tr = map(playerX,width/2,width,0,255);
    textAlign(CENTER);
    fill(225,225,225,tr);
    textSize(40);
    text("And in the distance I see, the sky speckled in gold,",  width/2,height/1.18);
    text("It took me back, in search of that night i longed,", width/2,height/1.13);
    }

}

function levelFive(){

  background('BLACK');

  fill(255,255,255)
  textAlign(CENTER)
  textSize(50)
  textFont('The Sad Train')
  text("I jumped through the window, in quest of the lights,",width/2,height/2)
  noFill();

  //UI text 
  fill(150)
  textAlign(CENTER)
  textSize(30)
  textFont('The Sad Train')
  text("Press Enter to continue...",width/1.12,height/1.1)
  noFill();

  if (keyIsDown(13)){
  glNo = glNo + 1;
  currentgamelevel = gameLevel[glNo];

  }
}

function levelSix(){

  //back ground change 
  if(playerX < width/2){
  let newcalculation = height/1.5+ playerSize;
  image(bgl3point1,0,0,width,newcalculation)
  } else if(playerX > width/2) {
    let newcalculation = height/1.5+ playerSize;
    image(bgl3point2,0,0,width,newcalculation)
  }

  groundPlane();
  playerSprite();
  playerMovement();

    //text things 
  if (playerX > 10  && playerX < width/2){   
    let tr = map(playerX,0,width/2,0,255);
    textAlign(CENTER);
    fill(255,255,255,tr);
    textSize(40);
    //strokeWeight(40);
    textFont('The Sad Train');
    text("I navigate through these puddles, rippling though the shimmering light,", width/2,height/1.18);
    //text("In harmony they shimmer, swaying to the rhythm of the night,", width/2,height/1.13);
  } 
    if (playerX > width/2 && playerX < width){
    let tr = map(playerX,width/2,width,0,255);
    textAlign(CENTER);
    fill(225,225,225,tr);
    textSize(40);
    text("As I got closer the honks grew louder, the ominous stench of sulfur filled the air",  width/2,height/1.18);
  }

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
  playerX = 5;
  } else if (playerX < 0){
    glNo = glNo -1;
    currentgamelevel = gameLevel[glNo];
    playerX = width - playerSize;
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
} 

}

