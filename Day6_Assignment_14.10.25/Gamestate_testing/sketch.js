
let gameState = "Intro";
let xDirectionmovement=0;
let xSpeed = 5;
//let cowXdirectionmovement = 0;
//let xcowSpeed = 10; 


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  if(gameState === "Intro"){
    introLevel();
  } else if (gameState === "level 1") {
    levelOne();

  } else if (gameState ==="level 2"){
    levelTwo();
  }

}

function introLevel(){
  fill("RED");
  rect(0,0,windowWidth,windowHeight);
  fill("BLACK")
  textSize(100)
  text("anshul",width/2,height/2)
}

function levelOne(){
  let cowXdirectionmovement = 0;
  let xcowSpeed =5;

  fill("YELLOW")
  rect(0,0,windowWidth,windowHeight);
  fill("BLUE");
  textSize(50)
  text("anshul and anshul", width/2,height/2);

   //my ground plane 
  fill("black")
  rect(0,height/2,width,height/2)

 
  playerMovement();
  //my char 
  fill("ORANGE")
  rect(xDirectionmovement,windowHeight/2-50,50,50)

  //cowauto speed
 



  //cow sprite
  cowXdirectionmovement = cowXdirectionmovement+xcowSpeed;
  if(cowXdirectionmovement>width){

    cowXdirectionmovement = width-100;
    xcowSpeed=0


  }

  fill("PURPLE");
  rect(cowXdirectionmovement,windowHeight/2-25,100,25)

 
  

}

function levelTwo(){
  fill("WHITE")
  rect(0,0,windowWidth,windowHeight);
  fill("BLUE");
  textSize(50)
  text("anshul and anshul", width/2,height/2);

   //my ground plane 
  fill("black")
  rect(0,height/2,width,height/2)

 
  playerMovement();


  //my char 
  fill("ORANGE")
  rect(xDirectionmovement,windowHeight/2-50,50,50)



}

function keyPressed(){
  if(gameState === "Intro"){
    gameState = "level 1";
    
  }else if(keyCode==72){
    gameState = "level 2"
    cowXdirectionmovement=0;
  }
}

function playerMovement(){

   if(keyIsDown(RIGHT_ARROW)){
    xDirectionmovement= xDirectionmovement+xSpeed
  } else if (keyIsDown(LEFT_ARROW)){
    xDirectionmovement=xDirectionmovement-xSpeed
  }

  if (xDirectionmovement>windowWidth){
    gameState = "level 2";
    xDirectionmovement = 0;
    
  }

}

function cowMovement(){



}
