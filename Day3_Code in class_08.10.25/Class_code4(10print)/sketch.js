
let x,y,size,newnumber;

function setup() {
  
  createCanvas(windowWidth, windowHeight);
  background(220);
  x=0;
  y=0;
  size = 20;
  
}

function draw() {
  newnumber = random(0,1);
  
  if(newnumber<0.5){
    line(x,y,x+size,y+size);
    
  } else {
    line(x+size,y,x,y+size);
  }
  x=x+size;
  if (x>width){
    x=0;
    y=y+size;
  }
  //if(x<width){
    //y=y+size;
  //}

 // if(x==width){
  //  y=y+size
  //}
  
  
  




}

