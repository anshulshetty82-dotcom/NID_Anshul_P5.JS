function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  
    // let noiseValue = noise(0.1*frameCount);
    // let mapedNoise = map(noiseValue,0,1,10,200)
    // background(0,0,0,mapedNoise);
    // ellipse(mouseX,mouseY/2,mapedNoise)

  for(let i=0; i<width; i=i+5){
    for(let j=0; j<height; j=j+5){
      let noiseNewvalue = noise(i*frameCount*0.01,j*frameCount*0.01)
      noStroke()
      fill(noiseNewvalue*255)
      rect(i,j,5,5)
    }
      
  }
    

   
    
  

}
