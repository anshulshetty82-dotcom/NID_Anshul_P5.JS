
let size = 40;
const proximityRadius = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //background("#b9e2e9ff");
  frameRate(2);
}

function draw() {

  background("#000000ff");
  for(let j = 0; j < height; j = j + size){
    for(let i=0; i < width; i = i + size){
      let choice = random(0,1);
      if(choice <0.5){
      noStroke();
      fill("#f5f5f5ff")
      ellipse(i,j,size,size);
      } else{
        fill("#4c7be873");
        ellipse(i,j,size/2,size/2);
    }

    }

  }   

}



