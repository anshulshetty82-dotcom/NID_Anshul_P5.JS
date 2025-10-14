let size = 100;
let hexnumber=["#3C7DA6","#5095BF]","#D9C6B0","#BFA68F","#593E2E"]


function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  frameRate(5);
  
}

function draw() {

  background(220);
  for(let i=0; i<width; i=i+size){
    for(let j=0; j<height; j=j+size){
      let choice = floor(random(0,hexnumber.length))
      fill(hexnumber[choice]);
      rect(i,j,size,size);
    }
  }
}
