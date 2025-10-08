let size=10;
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate (50);
}

function draw() {
  background(220);
  
  for(let j=0; j<height; j=j+size){
    for(let i=0; i < width; i=i+size){
      let choice = random(0,1);
      if(choice<0.5){
        stroke(i/5,j,choice)
        line(i,j,i+size,j+size);
      }else{
        ellipse(i+size,j,i,j+size);
      }
    }
  }
}
