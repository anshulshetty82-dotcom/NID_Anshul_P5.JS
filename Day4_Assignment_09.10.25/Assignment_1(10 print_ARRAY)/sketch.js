let size = 200;
let myPattern=[];
let noImages=4;

function preload(){
  for(let i=0; i < noImages;i=i+1){
  let name = "Images/g"+i+".jpg";
  myPattern[i]= loadImage(name);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(5);
}

function draw() {
  background(220);

  for(let i=0; i<width; i=i+size){
    for(let j=0; j<height; j=j+size){
      let choice = floor(random(0,noImages));
      image(myPattern[choice],i,j,size,size);
    }
  }

}
