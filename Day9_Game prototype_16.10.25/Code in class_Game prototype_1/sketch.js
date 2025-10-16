//gamestatearray
let gameStatearray = ["intro", "level1", "level2", "level3"]

//array var 
let gno = 0;

//gamestate 
let currentGamestate = gameStatearray[0];

//image var 
//image - for level 1
let bg1, l1g1, l1f1

//image - for level 2
let bg2, l2f1;

//player movement var
let x = 0, y = 0;
let xdir = 0, ydir = 0;

//animation control 
 let sprites = [];
 let spriteX = 10, spriteY = 7;
 let count = 0;
 let row = 0;

//sound var 
let playerWalksound;
let gameSoundbackground;

//preload image 
function preload() {
  //level 1 images 
  bg1 = loadImage("images/1.png");
  l1g1 = loadImage("images/2.png");
  l1f1 = loadImage("images/3.png");

  //level 2 images 
  bg2 = loadImage("images/4.jpg");
  l2f1 = loadImage("images/5.png");

  //player sprite sheet 
  spriteImage = loadImage('images/g0.png');

  //player walk sound 
  playerWalksound = loadSound('sounds/s0.mp3')
  gameSoundbackground = loadSound('sounds/s1.mp3')
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  gameSoundbackground.setVolume(0.5);

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
  if (currentGamestate == gameStatearray[0]) {
    introScreen();
  } else if (currentGamestate == gameStatearray[1]) {
    levelOne();
  }
}

// ------------------------------LEVEL THINGS ------------------------------------------------------------------
function introScreen() {
  //bgsound 
  //gameSoundbackground.loop();

  //background
  image(bg1, 0, 0, width, height);
  // text on screen 
  textOnscreenLevelone();
  //ground plane
  image(l1g1, 0, 0, width, height);

  //player functions 
  player();
  playerMovement();

  //world assets 
  //worldAssetOne(width / 8);

  //foreground
  image(l1f1, 0, 0, width, height);

}

function levelOne() {

  //background 
  image(bg2, 0, 0, width, height);
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

// ----------------------------- PLAYER RELATED THINGS ---------------------------------------------------------

function player() {

  // fill("BLACK");
  // rect(pxmovement, 582, 100, 100);

  // player sprite 

  image(sprites[row][count], x, 485,200,200);
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
    xdir = +7;

    if (!playerWalksound.isPlaying()) {      
            playerWalksound.loop(); 
        }
    
  } else if (keyIsDown(LEFT_ARROW)) {
    row = 2;
    ydir = 0;
    xdir = -7;
    
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
    print(gno);

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

  if (walkSound.isPlaying()) {
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
    fill(0,0,0,tr);
    textSize(100);
    text("Where am i.", width/2,height/2);
  } 

  if (x > width/2 && x < width){
    let tr = map(x,width/2,width,0,255);
    textAlign(CENTER);
    fill(0,0,0,tr);
    textSize(100);
    text("Who am i.", width/2,height/2);
    }
}

function textOnscreenLevetwo(){

  if (x > 10  && x < width/2){
    
    let tr = map(x,0,width/2,0,255);
    textAlign(CENTER);
    fill(0,0,0,tr);
    textSize(100);
    text("Where am i.", width/2,height/2);
  } 

  if (x > width/2 && x < width){
    let tr = map(x,width/2,width,0,255);
    textAlign(CENTER);
    fill(0,0,0,tr);
    textSize(100);
    text("Who am i.", width/2,height/2);
    }
}

function mouseClicked() {
    // 1. Check if the audio context is running (p5.js handles this)
    userStartAudio(); 
    
    // 2. Check if the background music is loaded AND not playing
    if (gameSoundbackground.isLoaded() && !gameSoundbackground.isPlaying()) {
        gameSoundbackground.loop();
    }
    
    // You can also place the first movement/level start logic here if you want
    // the game to start only after the first click.
}