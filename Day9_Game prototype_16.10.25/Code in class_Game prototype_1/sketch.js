//gamestatearray
let gameStatearray = ["startscreen","intro", "level1", "level2", "level3","level4","level5","level6","endScreen"]

//array var 
let gno = 0;

//gamestate 
let currentGamestate = gameStatearray[0];

//image var 
//image - for level 1
let bg1, l1g1, l1f1
//image - for level 2
let bg2, l2f1;
//image - for level 3 
let bg3, l3f1;
//image - for level 3 
let bg4, l4f1;

//player movement var
let x = 0, y = 0;
let xdir = 0, ydir = 0;
let playerspeed = 20;

//animation control 
 let sprites = [];
 let spriteX = 10, spriteY = 7;
 let count = 0;
 let row = 0;

//sound var 
let playerWalksound;
let gameSoundbackground;
let industrialSounds;
let endsound;

//ground plane and player consts 
const groundY = 530;
const playerSize = 200;

// NPC Image constants (Original size and ratio)
const NPC_W = 872;
const NPC_H = 608;
let GROUND_Y;
let NPC_Y_DRAW;
let NPC_X_POS; 

//level 6 quote 
const KHALIL_GIBRAN_QUOTE = `It is said that before entering the sea
a river trembles with fear.
She looks back at the path she has traveled,
from the peaks of the mountains,
the long winding road crossing forests and villages.
And in front of her,
she sees an ocean so vast,
that to enter
there seems nothing more than to disappear forever.
But there is no other way.
The river can not go back.
Nobody can go back.
To go back is impossible in existence.
The river needs to take the risk
of entering the ocean
because only then will fear disappear,
because thats where the river will know
its not about disappearing into the ocean,
but of becoming the ocean.

Khalil Gibran`;

function updateDynamicPositions() {// i used AI for this << 
    
    // 1. Calculate Dynamic Ground Line
    // Anchor the ground 150 pixels up from the bottom edge.
    const GROUND_OFFSET = 180; 
    
    // The player's sprite is 200px tall. This is where the top-left of the player is drawn.
    GROUND_Y = height - GROUND_OFFSET - playerSize; 
    
    // 2. Calculate NPC Draw Y
    // Place the NPC's top-left corner so its bottom edge meets the ground line (height - GROUND_OFFSET).
    // CRITICAL: We subtract the fixed NPC_H (608) here.
    NPC_Y_DRAW = (height - GROUND_OFFSET) - NPC_H; 
    
    // 3. Calculate NPC Draw X (Still relative to width)
    NPC_X_POS = width / 2 - 400; 
}

//preload image 
function preload() {
  //level 1 images 
  bg1 = loadImage("images/1.png");
  l1g1 = loadImage("images/2.png");
  l1f1 = loadImage("images/3.png");
  //level 2 images 
  bg2 = loadImage("images/4.jpg");
  l2f1 = loadImage("images/5.png");
  //level 3 images 
  bg3 = loadImage("images/6.jpg")
  l3f1 = loadImage('images/8.png')
  //level 4 images 
  bg4 = loadImage("images/7.jpg")
  l4f1 = loadImage("images/12.png")
  l4c1 = loadImage("images/11.png")
  //level 5 images 
  bg5 = loadImage ("images/11.jpg")
  

  //player sprite sheet 
  spriteImage = loadImage('images/g0.png');

  //player walk sound 
  playerWalksound = loadSound('sounds/s0.mp3')
  gameSoundbackground = loadSound('sounds/s1.mp3')
  industrialSounds = loadSound ('sounds/s2.mp3')
  murmurSounds = loadSound ('sounds/s3.mp3')
  endsound = loadSound ('sounds/s5.mp3')
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  gameSoundbackground.setVolume(0.2);

  updateDynamicPositions();

  //sprite cutting, r = start animation, coll = anim fame, 
  let w = spriteImage.width / spriteX;
  let h = spriteImage.height / spriteY;

  for (let i = 0; i < spriteY; i++) {
    sprites[i] = [];
    for (let j = 0; j < spriteX; j++) {
      sprites[i][j] = spriteImage.get(j * w, i * h, w, h);
    }
  }
  
}

function draw() {
  if(currentGamestate == gameStatearray[0] ){
    startScreen();
  }else if (currentGamestate == gameStatearray[1]){
    levelOne();
  } else if (currentGamestate == gameStatearray[2]){
    levelTwo();
  } else if(currentGamestate== gameStatearray[3]){
    levelThree();
  } else if(currentGamestate == gameStatearray[4]){
    levelFour();
  } else if(currentGamestate == gameStatearray[5]){
    levelFive();
  } else if(currentGamestate == gameStatearray[6]){
    levelSix();
  } 
  
}

// ------------------------------LEVEL THINGS ------------------------------------------------------------------
function startScreen(){
  fill("BLACK");
  rect(0,0,width,height);

  textOnscreenintrosceen();

}

function levelOne() {
  //bgsound 
  //gameSoundbackground.loop();

  //background
  image(bg1, 0, 0, width, height);

  //ground plane
  image(l1g1, 0, 0, width, height);

  //player functions 
  player();
  playerMovement();

  //world assets 
  //worldAssetOne(width / 8);

  //foreground
  image(l1f1, 0, 0, width, height);

    // text on screen 
  textOnscreenLevelone();

}

function levelTwo() {

  //background 
  image(bg2, 0, 0, width, height);

  //machine sounds 
  if (!industrialSounds.isPlaying()) {
      industrialSounds.setVolume(0.1); 
      industrialSounds.loop()
  }

  //ground plane
  image(l1g1, 0, 0, width, height);

  //player functions 
  player();
  playerMovement();

  //text on level 2
  textOnscreenLevetwo();

  //foreground
  image(l2f1, 0, 0, width, height);

}

function levelThree(){
  //background 
  image(bg3, 0, 0, width, height);

    //machine sounds 
  if (!murmurSounds.isPlaying()) {
      murmurSounds.setVolume(1);
      murmurSounds.loop();
  }

    //ground plane
  image(l1g1, 0, 0, width, height);

  //player functions 
  player();
  playerMovement();

   //foreground
  image(l3f1, 0, 0, width, height);


  textOnscreenLevelthree();

}

function levelFour(){
    //background 
  image(bg4, 0, 0, width, height);

    //ground plane
  //image(l1g1, 0, 0, width, height);

  //npc images 
  levelfourNPC();

    //player functions 
  player();
  playerMovement();

    //foreground 
  image(l4f1,0,0);

  textOnscreenLevelfour();


}

function levelFive(){
  //background 
  image(bg5,0,-100,2200,1080);
 

  //ground plane
  image(l1g1, 0, 0, width, height);

    //player functions 
  player();
  playerMovement();

  textOnscreenLevelfive();
  

 

}

function levelSix(){

  if(gameSoundbackground.isPlaying()){
    gameSoundbackground.stop();
  }
  if(industrialSounds.isPlaying()){
    industrialSounds.stop();
  }
  if(murmurSounds.isPlaying()){
    murmurSounds.stop();
  }
  if(!endsound.isPlaying()){
    endsound.loop();
  }
  


  //background 
  fill(255);
  rect(0,0,windowWidth,windowHeight);

     //player functions 
  player();
  playerMovement();

  textOnscreenLevelsix();

  displayGibranQuote();

}

// ----------------------------- PLAYER RELATED THINGS ---------------------------------------------------------

function player() {

  // fill("BLACK");
  // rect(pxmovement, 582, 100, 100);

  // player sprite 
  // ---------------------------------------------- to fix, player sprite y const. introduce a const,
  // ---------------------------------------------- and fix the y, to the hight of the ground.... instead of hard coding it!! 
  image(sprites[row][count], x, groundY,playerSize,playerSize);
  if (frameCount % 5 == 0) {
    if(xdir !==0){
      count = (count + 1) % spriteX;
    }else{
      count = (count + 1) % spriteX;
    }
    
    x = x + xdir;
    y = y + ydir;
  }

}

function playerMovement() {
  

  if (keyIsDown(RIGHT_ARROW)) {
    row = 1;
    ydir = 0;
    xdir = +playerspeed;

    if (!playerWalksound.isPlaying()) {      
            playerWalksound.loop(); 
        }
    
  } else if (keyIsDown(LEFT_ARROW)) {
    row = 2;
    ydir = 0;
    xdir = -playerspeed;
    
        if (!playerWalksound.isPlaying()) {      
            playerWalksound.loop(); 
        }

  } else {
    xdir = 0;
    if (playerWalksound.isPlaying()) {
            playerWalksound.stop();
    }        

  }

  if (x > width) {
    // debugger;
    gno = gno + 1;
    currentGamestate=gameStatearray[gno];
    x = 0;
    //print(gno);

  } else if (x < 0) {
    gno = gno - 1
    currentGamestate=gameStatearray[gno];
    x = width;
  }

}

function keyReleased() {
  row = 0;
  xdir = 0;
  ydir = 0;
  count = 0;

  if (playerWalksound.isPlaying()) {
        playerWalksound.stop()
  }
}

// ----------------------------- WORLD ASSET THINGS ------------------------------------------------------------

// function worldAssetOne(x){
//  fill("PURPLE")
//  circle(x,400,wsize);

// }

//------------------------------ TEXT ON SCREEN ----------------------------------------------------------------

function textOnscreenLevelone(){

  if (x > 10  && x < width/2){
    
    let tr = map(x,0,width/2,0,255);
    textAlign(CENTER);
    fill(255,255,255,tr);
    textSize(40);
    strokeWeight(40);
    textFont('Courier New');
    text("Where am i, what is this place.", width/2,height-70);
  } 

  if (x > width/2 && x < width){
    let tr = map(x,width/2,width,0,255);
    textAlign(CENTER);
    fill(225,225,225,tr);
    textSize(40);
    textFont('Courier New');
    text("Is there a path beyond, I feel cold...", width/2,height-70);
    }

    
}

function textOnscreenLevetwo(){

  if (x > 10  && x < width/2){
    
    let tr = map(x,0,width/2,0,255);
    textAlign(CENTER);
    fill(225,225,225,tr);
    textSize(60);
    text("These voices !!", width/2,height-70);
  } 

  if (x > width/2 && x < width){
    let tr = map(x,width/2,width,0,255);
    textAlign(CENTER);
    fill(225,225,225,tr);
    textSize(40);
    text("Aaahh! It's deafening. Go away!", width/2,height-70);
    }
}

function textOnscreenLevelthree(){

  if (x > 10  && x < width){
    
    let tr = map(x,0,width,0,255);
    textAlign(CENTER);
    fill(225,225,225,tr);
    textSize(70);
    text("They follow me.", width/2,height-70);
  } 

  // if (x > width/2 && x < width){
  //   let tr = map(x,width/2,width,0,255);
  //   textAlign(CENTER);
  //   fill(225,225,225,tr);
  //   textSize(100);
  //   text("Who am i.", width/2,height-70);
  //   }
}
function textOnscreenLevelfour(){

  if (x > 10  && x < width/2){
    
    let tr = map(x,0,width,0,255);
    textAlign(CENTER);
    fill(225,225,225,tr);
    textSize(40);
    text(".... who are you ?", width/2,height-70);

        noStroke()
    fill(0,0,0,tr);

    rect(width-650,height/5,600,400,20,20)
    

   textAlign(CENTER);
    fill(225,225,225,tr);
    textSize(30);
    text("I am your Overman! You know this place used to be a happy place, a realm of your making. The suffering of your conscious mind has no bounds, which is why these voices slip into this realm. Face them to overcome your fears. All these voices are in your head; be unfazed and move ahead.", width-650,height/5,600,500);
  } 

  
  if (x > width/2 && x < width){
    let tr = map(x,width/2,width,0,255);
    textAlign(CENTER);
    fill(225,225,225,tr);
    textSize(40);
    text("fear ??.. these voices are my fear ?", width/2,height-70);
    }

}

function textOnscreenLevelfive(){

  if (x > 10  && x < width/2){
    
    let tr = map(x,0,width,0,255);
    textAlign(CENTER);
    fill(225,225,225,tr);
    textSize(40);
    text("For all these times you have taken over me, I have been too blinded ", width/2,height-70);
    text("by your shroud to see. My path is mine to take, I take myself back from you!", width/2,height-20);
  }

    if (x > width/2 && x < width){
    let tr = map(x,width/2,width,0,255);
    textAlign(CENTER);
    fill(225,225,225,tr);
    textSize(40);
    text("I need to see beyond your path, I'm tired of your disposition! I'm leaving now.", width/2,height-70);
    }
}

function textOnscreenLevelsix(){

  if (x > 10  && x < width/2){
    
    let tr = map(x,0,width/2,0,255);
    textAlign(CENTER);
    fill(0,0,0,tr);
    textSize(35);
    text("Thankyou for playing :D", width/2,height-70);
  }

    if (x > width/2 && x < width){
    let tr = map(x,width/2,width,0,255);
    textAlign(CENTER);
    fill(225,225,225,tr);
    textSize(40);
    text("I need to see beyond your path, I'm tired of your disposition! I'm leaving now.", width/2,height-70);
    }
}

// Example: The text fades in as the player moves from the left (x=0) to the center (x=width/2)

function displayGibranQuote() {
    
    // Calculate the opacity (alpha value) based on the player's X position
    // Map the player's X position (0 to width/2) to an alpha value (0 to 255)
    let opacity = map(x, 0, width / 2, 0, 255);
    
    // If the player moves past the center, the text will stay fully visible
    opacity = constrain(opacity, 0, 255); 

    // 1. Setup Text Properties
    fill(0, opacity); // Apply the dynamic opacity (alpha)
    textSize(20);
    textFont('Courier New');
    textAlign(LEFT); 

    // 2. Define the Text Box Area for wrapping (e.g., center of the screen)
    let boxX = width * 0.1;
    let boxY = height * 0.15;
    let boxWidth = width * 0.8;
    let boxHeight = height * 0.7; 

    // 3. Display the text with wrapping
    text(
        KHALIL_GIBRAN_QUOTE, 
        boxX, 
        boxY, 
        boxWidth, 
        boxHeight
    );
}

function textOnscreenintrosceen(){

    textAlign(CENTER);
    fill(225,225,225);
    textSize(70);
    textFont('Courier New');
    text("TRIAL OF THE NIGHT", width/2,height/2);
    textSize(40);
    text("(Click to start)", width/2,height-300);
  

}


// i used ai for this part, i could not understand the logic, and it was messing up my game. something with 
// loop had to do with it 

function mouseClicked() {
    // 1. Check if the audio context is running (p5.js handles this)
    userStartAudio(); 
    
    // 2. Check if the background music is loaded AND not playing
    if (gameSoundbackground.isLoaded() && !gameSoundbackground.isPlaying()) {
        gameSoundbackground.loop();
    }
    
    // You can also place the first movement/level start logic here if you want
    // the game to start only after the first click.

    if(currentGamestate == gameStatearray[0]){
     gno = gno+1;
     currentGamestate = gameStatearray[gno];
    } 

}

function levelfourNPC(){

    // 1. Draw the NPC using fixed size and dynamic position
    // CRITICAL: We use NPC_W (872) and NPC_H (608) here.
    image(l4c1, NPC_X_POS, NPC_Y_DRAW, NPC_W, NPC_H); 


}