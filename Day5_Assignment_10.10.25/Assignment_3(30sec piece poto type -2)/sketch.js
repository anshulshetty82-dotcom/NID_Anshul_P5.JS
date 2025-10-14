// === GLOBAL NARRATIVE PROMPTS ===
const LEVEL_PROMPTS = {
    // Level 1: Initial Choice
    1: "HAPPY MAN - NIGHT TRAILS",
    
    // Level 1.5: Placeholder for the path split point (if needed later)
    1.5: "Level 1.5: There is no turning back now.",
    
    // Level 2: Right Path Continuation
    2: "Level 2: The path ahead is treacherous. Keep moving forward.",
    
    // Level 3: Final Challenge
    3: "Level 3: Victory is near, but the final test awaits.",
};


// === GLOBAL STATE & ASSETS ===
let gameState = 'INTRO';
let currentLevel = 1;

// Background Images
let bg_level1;
let bg_level1_5;
let bg_level2;
let bg_level3;
let bg_end_level; // Background for the END_LEVEL screen

// ⭐️ NEW MOSAIC VARIABLES
let size = 100;
let g0, g1, g2, g3;
let genImages = []; 

// INTEGRATED SPRITE ANIMATION VARIABLES
let spriteImage, sprites = [];
let spriteX = 10, spriteY = 7; // 10 columns (frames), 7 rows (actions)
let count = 0; 
let row = 0;   
let frameDelay = 5; 
let frameTimer = 0;

let xdir = 0;
let postionx = 0;
let playerY;
let isLeftPath = false; 

// Array of level properties now holds the loaded image objects
const ALL_BACKGROUNDS = {
    1: null,
    1.5: null,
    2: null,
    3: null
};

// === CHARACTER CONSTANTS ===
const PLAYER_SIZE = 50; 
const PLAYER_DRAW_SIZE = 200;
const PLAYER_SPEED = 7;
const PLAYER_DIAG_SPEED = 14;

// UNIFIED GROUND LINE
const GROUND_Y_POS_RATIO = 1.2; 


// ⭐️ PRELOAD: Load all images (Backgrounds and Sprite Sheet)
function preload() {
    // ⭐️ NEW: Load mosaic images
    g0 = loadImage("Images/0.jpg");
    g1 = loadImage("Images/1.jpg");
    g2 = loadImage("Images/2.jpg");
    g3 = loadImage("Images/3.jpg");

    // Existing Background images
    bg_level1 = loadImage("Images/g0.jpg");
    bg_level1_5 = loadImage("Images/g1.png");
    bg_level2 = loadImage("Images/g2.jpg");
    bg_level3 = loadImage("Images/g3.png");
    
    // Load the END_LEVEL background
    bg_end_level = loadImage("Images/g5.jpg"); 

    // Assign the loaded images to the ALL_BACKGROUNDS object
    ALL_BACKGROUNDS[1] = bg_level1;
    ALL_BACKGROUNDS[1.5] = bg_level1_5;
    ALL_BACKGROUNDS[2] = bg_level2;
    ALL_BACKGROUNDS[3] = bg_level3;

    // Animation sprite sheet
    spriteImage = loadImage('Images/g4.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();

    // ⭐️ NEW: Set the slow frame rate for the glitch effect
    frameRate(2); 

    // Initialize character's X position in the center
    postionx = width / 2;
    
    // UNIFIED FIX: playerY is initialized at the ground line
    playerY = height / GROUND_Y_POS_RATIO; 

    // ⭐️ NEW: Populate the genImages array
    genImages.push(g0);
    genImages.push(g1);
    genImages.push(g2);
    genImages.push(g3); 

    // Split the sprite sheet into individual frames (sub-images)
    let w = spriteImage.width / spriteX;
    let h = spriteImage.height / spriteY;

    for (let i = 0; i < spriteY; i++) {
        sprites[i] = [];
        for (let j = 0; j < spriteX; j++) {
            sprites[i][j] = spriteImage.get(j * w, i * h, w, h);
        }
    }
}

function keyPressed() {
    if (gameState === 'INTRO') {
        gameState = 'LEVEL_SCREEN';
    } 
    else if (gameState === 'GAME_OVER') {
        if (key === 'r' || key === 'R') {
            restartGame();
        }
    }
    // Transition from END_LEVEL to GAME_OVER
    else if (gameState === 'END_LEVEL') {
        if (keyCode === ENTER) {
            endGame('LOSE_CONSEQUENCE');
        }
    }
}

function keyReleased() {
    // Movement managed in handleMovement()
}

function draw() {
    if (gameState === 'INTRO') {
        drawIntro();
    } else if (gameState === 'LEVEL_SCREEN') {
        drawLevelScreen();
    } else if (gameState === 'WIN_SCREEN') {
        drawWinScreen();
    } 
    else if (gameState === 'GAME_OVER') {
        drawGameOver();
    }
    // Handle the End Level screen
    else if (gameState === 'END_LEVEL') {
        drawEndLevel();
    }
}

// === GAME STATE DRAW FUNCTIONS ===

function drawIntro() {
    image(ALL_BACKGROUNDS[1], 0, 0, width, height);
    fill(0, 100);
    rect(0, 0, width, height);
    textAlign(CENTER);
    fill(255);
    textSize(48);
    text("Press ANY KEY to Start", width / 2, height / 2);
}

// ⭐️ NEW FUNCTION: Draws the glitch mosaic background
function drawMosaicBackground() {
    // This function only runs if currentLevel is 1 when called by drawLevelScreen()
    
    // Draw background (or use a neutral color if needed)
    background(220);

    for (let i = 0; i < width; i += size) {
        for (let j = 0; j < height; j += size) {
            
            // Generate random index based on the number of images loaded
            let choice = floor(random(0, genImages.length));
            
            // Draw the chosen image tile
            image(genImages[choice], i, j, size, size); 
        }
    }
}

function drawLevelScreen() {
    // 1. Draw the current level's image background
    
    // ⭐️ MODIFIED: If Level 1, draw the mosaic. Otherwise, draw the static image.
    if (currentLevel === 1) {
        drawMosaicBackground();
    } else {
        image(ALL_BACKGROUNDS[currentLevel], 0, 0, width, height);
    }
    
    // 2. Draw the ground plane
    fill("black");
    const groundLine = height / GROUND_Y_POS_RATIO;
    rect(0, groundLine, width, height); 

    // 3. Handle Input & Movement
    handleMovement();
    checkLevelExit();

    // 4. DRAW ANIMATED CHARACTER (remains the same)
    let spriteWidth = PLAYER_DRAW_SIZE;
    let spriteHeight = PLAYER_DRAW_SIZE;
    let xOffset = spriteWidth / 2 - (PLAYER_SIZE / 2);

    image(
        sprites[row][count], 
        postionx - xOffset, 
        playerY - spriteHeight, 
        spriteWidth, 
        spriteHeight
    );

    // ⭐️ NEW: LOCAL TEXT PROMPT DEFINITION AND DRAWING

    let promptText = "No prompt available for this level.";

    // Define the prompt text based on the current level
    switch(currentLevel) {
        case 1:
            promptText = LEVEL_PROMPTS[1]; // Use the text from the global object
            break;
        case 1.5:
            promptText = LEVEL_PROMPTS[1.5];
            break;
        case 2:
            promptText = LEVEL_PROMPTS[2];
            break;
        case 3:
            promptText = LEVEL_PROMPTS[3];
            break;
    }

    const textBoxWidth = 600;
    const textBoxHeight = 80;
    const centerX = width / 2;
    const centerY = height / 5; 

    // Draw semi-transparent background box
    fill(0, 0, 0, 150); // Black with 150/255 opacity
    rect(centerX - textBoxWidth / 2, centerY - textBoxHeight / 2, textBoxWidth, textBoxHeight, 10); // 10px rounded corners

    // Draw text
    textAlign(CENTER, CENTER);
    fill(255); // White text
    textSize(20);
    text(promptText, centerX, centerY);
    
    // 5. Debug Text (remains the same)
    fill(255);
    textSize(16);
    textAlign(LEFT);
    text(`Current Level: ${currentLevel}`, 10, 30);
    text(`Path: ${isLeftPath ? 'LEFT' : 'RIGHT'}`, 10, 50);
}

function drawWinScreen() {
    background(0, 150, 0);
    textAlign(CENTER);
    fill(255);
    textSize(48);
    text("ALL LEVELS COMPLETE!", width / 2, height / 2);
}

function drawGameOver() {
    background(150, 0, 0); // Dark Red background

    textAlign(CENTER);
    fill(255);

    textSize(72);
    text("GAME OVER", width / 2, height / 3);

    textSize(24);
    text("Press R to Restart", width / 2, height / 2);
}

// END_LEVEL screen with background and ground
function drawEndLevel() {
    // 1. Draw the Background Image
    if (bg_end_level) {
        image(bg_end_level, 0, 0, width, height);
    } else {
        background(50, 50, 100); // Fallback color
    }

    // 2. Draw the Ground Plane
    fill("black");
    const groundLine = height / GROUND_Y_POS_RATIO;
    rect(0, groundLine, width, height); 

    // 3. Draw Text
    textAlign(CENTER);
    fill(255);
    
    textSize(48);
    text("The Path is Forward Only.", width / 2, height / 3);
    
    textSize(24);
    text("Press ENTER to Face the Consequence...", width / 2, height / 2);
}

function endGame(status) {
    if (status === 'WIN') {
        gameState = 'WIN_SCREEN';
    } else if (status === 'LOSE_CONSEQUENCE' || status === 'LOSE') { 
        gameState = 'GAME_OVER';
    } else if (status === 'END_PATH') { // Triggers the intermediate screen
        gameState = 'END_LEVEL';
    }
    isLeftPath = false; 
}

function restartGame() {
    gameState = 'LEVEL_SCREEN'; 
    currentLevel = 1;
    isLeftPath = false; 

    // Reset player variables
    xdir = 0;
    postionx = width / 2;
    
    row = 0; 
    count = 0; 
    frameTimer = 0;
}

// === MOVEMENT AND TRANSITION LOGIC ===

function handleMovement() {
    let prevRow = row;
    xdir = 0;

    // 1. DETERMINE MOVEMENT AND ACTION 
    if (keyIsDown(RIGHT_ARROW) && keyIsDown(UP_ARROW)) {
        row = 3;
        xdir = PLAYER_DIAG_SPEED;
    } else if (keyIsDown(LEFT_ARROW) && keyIsDown(UP_ARROW)) {
        row = 4;
        xdir = -PLAYER_DIAG_SPEED;
    } else if (keyIsDown(65)) { // Key 'A'
        row = 5;
    } else if (keyIsDown(83)) { // Key 'S'
        row = 6;
    } else if (keyIsDown(LEFT_ARROW)) {
        row = 2;
        xdir = -PLAYER_SPEED;
    } else if (keyIsDown(RIGHT_ARROW)) {
        row = 1;
        xdir = PLAYER_SPEED;
    } else {
        row = 0; // Idle
    }

    // 2. ANIMATION CONTROL LOGIC
    if (prevRow !== row) {
        count = 0;
        frameTimer = 0;
    }

    frameTimer++;
    if (frameTimer >= frameDelay) {
        count = (count + 1) % spriteX;
        frameTimer = 0;
    }

    // 3. APPLY POSITION CHANGE
    postionx += xdir;
}


function checkLevelExit() {
    let nextLevel;
    let exitDirection;

    // --- EXIT TO THE RIGHT ---
    if (postionx > width) {
        exitDirection = 'RIGHT';

        if (isLeftPath) {
            // BACKTRACKING CHECK: Right exit while on the Left Path
            if (currentLevel > 1) { 
                 endGame('END_PATH'); // Two-step consequence!
                 return;
            }
        } 
        
        // Win Condition: Exiting Right on Level 3 (if on the Right Path)
        if (currentLevel === 3) {
            nextLevel = 'WIN';
        } else {
            // Main Path Progression (1 -> 2 -> 3)
            nextLevel = currentLevel + 1;
        }

    // --- EXIT TO THE LEFT ---
    } else if (postionx + PLAYER_SIZE < 0) {
        exitDirection = 'LEFT';

        if (!isLeftPath) {
            // BACKTRACKING CHECK: Left exit while on the Right Path
            if (currentLevel > 1) { 
                endGame('END_PATH'); // Two-step consequence!
                return;
            }
            
            // Left Path Initialization: Only happens on L1 choosing the left exit
            if (currentLevel === 1) {
                isLeftPath = true; 
            }
        } 
        
        // Win Condition: Exiting Left on Level 3 (if on the Left Path)
        if (currentLevel === 3) {
            nextLevel = 'WIN';
        } else {
            // Left Path Progression (L1 -> L2 -> L3)
            nextLevel = currentLevel + 1;
        }
    } 

    
    // If we've reached here without triggering an endGame('END_PATH'), proceed to advance.
    if (nextLevel) {
        advanceLevel(nextLevel, exitDirection);
    }
}

function advanceLevel(nextLevel, exitDirection) {
    // 1. Check for WIN Condition
    if (nextLevel === 'WIN') {
        endGame('WIN');
        return;
    }

    // 2. Check for Undefined level
    if (!ALL_BACKGROUNDS[nextLevel]) {
        console.log(`Transition to Level ${nextLevel} blocked.`);
        postionx = (xdir > 0) ? width - PLAYER_SIZE - 10 : 10;
        xdir = 0;
        return;
    }

    // 3. Normal Level Advancement
    currentLevel = nextLevel;
    console.log(`Loading Level ${currentLevel}. Path: ${isLeftPath ? 'LEFT' : 'RIGHT'}.`);

    // SYMMETRY SPAWN LOGIC: Position player on the mirrored corner
    if (isLeftPath) {
        postionx = width - PLAYER_SIZE - 1;
    } else {
        postionx = 1;
    }

    xdir = 0;
    row = 0;
    count = 0;
}