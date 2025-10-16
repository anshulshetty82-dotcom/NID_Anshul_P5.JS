let hitball = 0;
let lpaddel = 0;
let rpaddel = 0;

let pwidth = 7,
let pheight = 50;

function setup() {
  createCanvas(800, 400);
  hitball = new Ball (width/2,height/2,pwidth,pheight,10);

  lpaddel = new Paddle (0,height/2-height,)



}

function draw() {
  background(220);

  hitball.show();
}



