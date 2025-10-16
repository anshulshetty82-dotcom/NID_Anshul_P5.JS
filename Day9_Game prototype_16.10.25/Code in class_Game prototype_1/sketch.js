//gamestate 
let gameState = "intro";

//image var 
let bg1
let l1g1 


//preload image 
function preload(){
 bg1 = loadImage("images/1.jpg");
 l1g1 = loadImage("images/2.png");
}






function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  if(gameState === "intro");
  introScreen();

}

function introScreen(){

  image(bg1,0,0,width,height);
  image(l1g1,0,0,width,height);
  

}

