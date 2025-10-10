let size = 100;
let hexnumber=["#d9e9eeff","#9dbeeaff]","#6674b4ff","#6db1d3ff","#0e629aff","#659cc7ff","#f8f083ff","#aee99aff","#c77f65ff"]


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
