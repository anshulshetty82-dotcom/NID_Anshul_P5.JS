let mycar;
let yourcar;



function setup() {
  createCanvas(windowWidth, windowHeight, wheelSize);

  mycar = new Car(windowWidth/2,windowHeight/2,wheelSize);
  yourcar = new Car(windowWidth/3,windowHeight/2,wheelSize);


}

function draw() {
  background(220);
  mycar.show();
  yourcar.show();
}
