

let rotationAngle = 0;   
let smoothX, smoothY;    

function setup() {
  createCanvas(500, 500);
 
  colorMode(HSB, 360, 100, 100); 
  smoothX = width / 2;
  smoothY = height / 2;
  
  noCursor()
}

function draw() {

  let bgHue = map(mouseX, 0, width, 0, 360); 
 
  let bgBrightness = map(mouseY, 0, height, 20, 100); 
  
  background(bgHue, 30, bgBrightness); 

  stroke(0, 0, 0); 
  strokeWeight(1);

  // obstacles
  strokeWeight(2);
  stroke(0, 0, 0);
  fill(0, 0, 0);
  rect(150, 350, 10, 95, 1, 1);
  fill(0, 0, 0);
  circle(180, 430, 10);
  fill(0, 0, 0);
  circle(445, 415, 50);

  rect(20, 420, 15, 15, 1, 1);
  rect(250, 83, 5, 5, 1, 1);
  rect(360, 242, 10, 5, 1, 1);
  triangle(329, 366, 321, 358, 333, 357)

  push();
  translate(250, 250);
  rectMode(CENTER);
  rotate(345);
  rect(350, -50, 400, 350, 0, 5);
  pop();

  // 2. ANIMATION: Rotating Obstacle
  push();
  translate(250, 250);
  rectMode(CENTER);
  rotate(rotationAngle);
  rect(50, 50, 10, 25, 2, 2);
  pop();
  rotationAngle += 0.01; 

  push();
  translate(250, 250);
  rectMode(CENTER);
  rotate(7);
  rect(135, 100, 30, 70, 2, 2);
  rotate(125);
  rect(1, 300, 8, 40, 1, 1);
  pop();

  push();
  translate(250, 250);
  rectMode(CENTER);
  rotate(135);
  rect(0, 50, 50, 250, 5, 5);
  pop();

  push();
  translate(180, 309);
  rectMode(CENTER);
  rotate(9);
  rect(120, -170, 20, 90, 1, 1);
  pop();

  noFill();
  bezier(140, 340, 142, 311, 174, 285, 209, 358);
  bezier(209, 358, 218, 386, 253, 377, 271, 348);
  bezier(270, 349, 278, 338, 320, 301, 392, 317);
  bezier(321, 276, 310, 267, 314, 271, 307, 265);
  
  //lover line vertical
  stroke(0, 0, 0);
  line(485, 495, 485, 500);

  //lover 1line horizontal
  stroke(0, 0, 0);
  drawingContext.setLineDash([]);
  line(20, 490, 480, 490);
  line(20, 480, 480, 480);
  line(20, 470, 480, 470);
  line(20, 460, 480, 460);
  drawingContext.setLineDash([]);
  line(20, 450, 480, 450);
  line(20, 440, 140, 440);
  line(322, 277, 398, 303);

  //line horizontal
  line(140, 440, 140, 340);
  line(148, 105, 308, 266);
  
  
  //lover 1 curves
  noFill();
  angleMode(DEGREES);
  arc(480, 495, 10, 10, 270, 360);
  arc(20, 485, 10, 10, 90, 270);
  arc(480, 475, 10, 10, 270, 90);
  arc(20, 465, 10, 10, 90, 270);
  arc(480, 455, 10, 10, 270, 90);
  arc(20, 445, 10, 10, 90, 270);
  arc(393, 310, 20, 15, -50, 90);
  
  // 3. ANIMATION: Pulsing Line Width 
  let lineWidthScale = map(sin(frameCount * 0.1), -1, 1, 1, 3); // pulse between 1 and 3
  
  // Draw the two vertical lines with pulsing width
  strokeWeight(lineWidthScale);
  line(145, 445, 145, 345);
  line(165, 445, 165, 345);
  
  // Reset stroke weight to 2 for the rest of the fixed lines
  strokeWeight(2);
  line(242, 83, 242, 175);
  
  // 4. ANIMATION: Shifting Red Line Color 
  let redHue = 0; 
  let colorShift = map(sin(frameCount * 0.03), -1, 1, -5, 5); 
  
  // Set the animated stroke color
  stroke(redHue + colorShift, 80, 80); 

  //lover2 lines (original)
  line(20, 495, 475, 495);
  line(20, 485, 480, 485);
  line(20, 475, 480, 475);
  line(20, 465, 480, 465);
  line(20, 455, 480, 455);
  line(20, 445, 145, 445);
  line(145, 345, 165, 345);
  line(168, 445, 480, 445);
  line(151, 100, 226, 176);
  
  //line angle
  line(392, 432, 237, 336);
  line(269,313,330,372)
  line(330,372,386,262)
  line(317,216,384,240)
  line(262,84,268,130)

  //lover 2 point 
  strokeWeight(10)
  point(475,495)

  //lover2 curves
  strokeWeight(2);
  arc(20, 490, 10, 10, 90, 270);
  arc(480, 480, 10, 10, 270, 90);
  arc(20, 470, 10, 10, 90, 270);
  arc(480, 460, 10, 10, 270, 90);
  arc(20, 450, 10, 10, 90, 270);
  arc(480, 440, 10, 10, 270, 90);
  arc(445, 415, 60, 60, 180, 360);
  bezier(480, 435, 472, 429, 474, 418, 475, 414);
  bezier(415, 415, 413, 424, 404, 435, 392, 432);
  bezier(237, 336, 227, 321, 242, 288, 268, 312);
  bezier(386, 261, 390, 251, 388, 244, 383, 240);
  bezier(316, 216, 282, 202, 270, 137, 268, 129);
  bezier(242, 175, 282, 202, 270, 137, 226, 176);
  arc(252, 84, 20, 20, 180, 360)

  let easing = 0.08; 
  
  smoothX += (mouseX - smoothX) * easing;
  smoothY += (mouseY - smoothY) * easing;

  let hueValue = frameCount % 360; 

  noStroke();
  fill(hueValue, 100, 100, 0.7); 
  circle(smoothX, smoothY, 15);
}