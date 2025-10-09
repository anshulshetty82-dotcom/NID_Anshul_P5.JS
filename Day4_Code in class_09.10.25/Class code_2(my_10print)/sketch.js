let size = 100;
let g0,g1,g2,g3,g4;
let genImages=[];


function preload(){

  g0 = loadImage("Images/0.jpg")
  g1 = loadImage("Images/1.jpg")
  g2 = loadImage("Images/2.jpg")
  g3 = loadImage("Images/3.jpg")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(2);
  
}

function draw() {
  background(220);

  for (i = 0; i < width; i = i + size) {
    for (let j = 0; j < height; j = j + size) {
      choice = floor(random(0, 4));
      if (choice == 0) {
        image(g0,i,j);
      } else if(choice == 1) {
        image(g1,i,j);
      } else if(choice == 2) {
        image(g2,i,j);
      } else {
        image(g3,i,j);
      }


    }
  }
}
