
let sRow=3;
let sCols=3;
let spriteImage;
let sprite = [];

function preload(){
  spriteImage = loadImage("images/0.jpg");
}

function setup() {
   let sWidth = spriteImage.height/sRow;
   let sHeight = spriteImage.width/sCols;


  createCanvas(windowWidth, windowHeight);
  for(let h=0; h<sRow; h=h+1){
    for(let w=0; w<sCols; w=w+1){
    sprite[sprite.length]=spriteImage.get(w*width,h*height,sWidth,sHeight);
    }

    frameRate(2);
  }
  // loop through the sprite and store it in 1D sprite 
}

function draw() {
  background(220);
  let imagepick = frameCount%sprite.length;
  image(sprite[imagepick],0,0,100,100);
}



