let myflower;
let flower=[];

function setup() {
  createCanvas(windowWidth, windowHeight);

  
  
}

function draw() {
  background("black");

  for(let i=0;i<flower.length;i=i+1){
    flower[i].checkifSelected(mouseX,mouseY);
    flower[i].moveFlower();
    flower[i].drawFlower();
    

  }
  

}

function mousePressed(){
  let tempFlower = new Flower (mouseX,mouseY,random(-5,5),random(-5,5),100,100);
  flower.push(tempFlower);
}







