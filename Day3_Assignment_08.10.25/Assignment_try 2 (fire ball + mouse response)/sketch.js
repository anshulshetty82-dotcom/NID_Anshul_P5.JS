let size = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#ff0000ff");
  frameRate(50); 
  noCursor();
}

function draw() {
  //background("#ff0000ff");
  let halfSize = size / 2;
  const PROXIMITY_RADIUS = 100 ; 

  for (let j = 0; j < height; j = j + size) {
    for (let i = 0; i < width; i = i + size) {
      
      // Calculate the CENTER coordinates of the current grid cell
      let cx = i + halfSize;
      let cy = j + halfSize;
      
      let choice = random(0, 1);
      noStroke();
      
      if (choice < 0.5) {
        // Option 1: Large light-gray circle 
        fill("#ffe101ff"); 
        ellipse(cx, cy, size, size);
      } else {
        // Option 2: Small semi-transparent blue circle (the 'inner' circle)

        // 1. Calculate distance from mouse to the center of this cell
        let d = dist(mouseX, mouseY, cx, cy);
        
        // 2. Check if the mouse is within the defined proximity radius
        if (d < PROXIMITY_RADIUS) {
            // A. BRIGHT STATE (Mouse is close)
            // Use a bright, opaque fill color to "light up" the circle
            fill("#e92b61ff"); // Opaque blue
        } else {
            // B. NORMAL STATE (Mouse is far)
            // Use the original semi-transparent fill color
            fill("#efef1728"); // Semi-transparent blue
        }
        
        // Draw the inner circle
        ellipse(cx, cy, halfSize*2, halfSize*2);
      }
    }
  }   
}