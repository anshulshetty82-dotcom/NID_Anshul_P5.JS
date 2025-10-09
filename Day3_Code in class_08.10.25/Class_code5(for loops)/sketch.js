let size=20;
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate (5);
}

function draw() {
  background(220);
  
  for(let j=0; j<height; j=j+size){
    for(let i=0; i < width; i=i+size){
      let choice = random(0,1);
      if(choice<0.5){
        strokeWeight(cos(frameCount/10)*10)
        stroke(random,random,random)
        line(i,j,i+size,j+size);
      }else{
        line(i+size,j,i,j+size);
      }
    }
  }
}
