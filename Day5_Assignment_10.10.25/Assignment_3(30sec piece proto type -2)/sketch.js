// // === GLOBAL STATE & ASSETS ===
// let gameState = 'INTRO';
// let currentLevel = 1;

// // ⭐️ NEW: Global variables to hold the loaded image assets
// let bg_level1;
// let bg_level1_5;
// let bg_level2;
// let bg_level3; // Placeholder for future levels

// //char animation, replacing the rectangle 
// let spriteImage, sprites = [];
// let spriteX = 10, spriteY = 7;
// let count = 0;
// let row = 0;

// let xdir = 0;
// let postionx = 0;
// let playerY;

// // ⭐️ UPDATED: Array of level properties now holds the loaded image objects
// const ALL_BACKGROUNDS = {
//   // NOTE: These will be assigned in preload()
//   1: null,
//   1.5: null,
//   2: null,
//   3: null
// };

// // === CHARACTER CONSTANTS ===
// const PLAYER_SIZE = 50;
// const PLAYER_SPEED = 6;
// const GROUND_Y_RATIO = 1.64;

// // ⭐️ NEW: Load images before setup runs
// function preload() {
//   // Load the image files and assign them to the global variables
//   bg_level1 = loadImage("Images/g0.jpg"); 
//   bg_level1_5 = loadImage("Images/g1.png"); // Path for the Left Path background
//   bg_level2 = loadImage("Images/g2.jpg"); 
//   bg_level3 = loadImage("Images/g3.png"); 
  
//   // Assign the loaded images to the ALL_BACKGROUNDS object
//   ALL_BACKGROUNDS[1] = bg_level1;
//   ALL_BACKGROUNDS[1.5] = bg_level1_5;
//   ALL_BACKGROUNDS[2] = bg_level2;
//   ALL_BACKGROUNDS[3] = bg_level3; 

//   //animation sprite preload
//   spriteImage = loadImage('Images/g4.png');


// }

// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   noStroke();

//   // Initialize character's X position in the center
//   postionx = width / 2;
//   playerY = height / GROUND_Y_RATIO - PLAYER_SIZE;

//   //array for char animation
//   let w = spriteImage.width / spriteX;
//   let h = spriteImage.height / spriteY;

//   for (let i = 0; i < spriteY; i++) {
//     sprites[i] = [];
//     for (let j = 0; j < spriteX; j++) {

//       sprites[i][j] = spriteImage.get(j * w, i * h, w, h);
//     }
//  }
// }

// function keyPressed() {
//   if (gameState === 'INTRO') {
//     gameState = 'LEVEL_SCREEN';
//   }
// }

// function draw() {
//   if (gameState === 'INTRO') {
//     drawIntro();
//   } else if (gameState === 'LEVEL_SCREEN') {
//     drawLevelScreen();
//   } else if (gameState === 'WIN_SCREEN') {
//     drawWinScreen();
//   }
// }

// // === GAME STATE DRAW FUNCTIONS ===

// function drawIntro() {
//   // ⭐️ CHANGE: Use the image for the background
//   image(ALL_BACKGROUNDS[1], 0, 0, width, height);

//   fill(0, 100);
//   rect(0, 0, width, height);

//   textAlign(CENTER);
//   fill(255);
//   textSize(48);
//   text(`LEVEL ${currentLevel}`, width / 2, height / 3);
//   textSize(24);
//   text("Press ANY KEY to Start", width / 2, height / 2);
// }

// function drawLevelScreen() {
//   // 1. ⭐️ CHANGE: Draw the current level's image background
//   image(ALL_BACKGROUNDS[currentLevel], 0, 0, width, height);

//   // 2. Draw the ground plane
//   fill("black");
//   rect(0, height / GROUND_Y_RATIO, width, height);
  

//   // 3. Handle Input & Movement
//   handleMovement();

//   // 4. Check for Dual-Path Level Exit
//   checkLevelExit();

//   // 5. Draw the Character
//   fill("red");
//   rect(postionx, playerY, PLAYER_SIZE, PLAYER_SIZE, 2);
//   image(sprites[row][count], postionx,playerY-150,200,200);

//   // Optional: Display current level name/path for testing
//   // ⭐️ CHANGE: Using white text for better visibility over a background image
//   fill(255); 
//   textSize(16);
//   textAlign(LEFT);
//   text(`Current Level: ${currentLevel}`, 10, 30);
// }

// function drawWinScreen() {
//   background(0, 150, 0);
//   textAlign(CENTER);
//   fill(255);
//   textSize(48);
//   text("ALL LEVELS COMPLETE!", width / 2, height / 2);
// }

// // === MOVEMENT AND TRANSITION LOGIC ===

// function handleMovement() {
//   // Logic to smoothly handle key presses and releases (UNCHANGED)
//   if (xdir === 0) {
//      if (keyIsDown(RIGHT_ARROW)) {
//        xdir = PLAYER_SPEED;
//      } else if (keyIsDown(LEFT_ARROW)) {
//        xdir = -PLAYER_SPEED;
//      }
//     } else {
//      if (keyIsDown(RIGHT_ARROW) && xdir < 0) {
//          xdir = PLAYER_SPEED;
//      } else if (keyIsDown(LEFT_ARROW) && xdir > 0) {
//          xdir = -PLAYER_SPEED;
//      } else if (!keyIsDown(RIGHT_ARROW) && !keyIsDown(LEFT_ARROW)) {
//          xdir = 0;
//      }
//    }

//   postionx += xdir;
// }

// function checkLevelExit() {
//   // --- EXIT TO THE RIGHT (Right Path) ---
//   if (postionx > width) {
//     let nextLevel = (currentLevel === 1.5) ? 2 : currentLevel + 1;
//     advanceLevel(nextLevel);

//   // --- EXIT TO THE LEFT (Left Path) ---
//   } else if (postionx + PLAYER_SIZE < 0) {
//     if (currentLevel === 1) {
//         advanceLevel(1.5);
//     }
//   }
// }

// function advanceLevel(nextLevel) {
//   currentLevel = nextLevel;

//   // Check if the next level image exists in our asset map
//   if (ALL_BACKGROUNDS[currentLevel]) {
//     console.log(`Loading Level ${currentLevel}`);

//     let lastDirection = (xdir > 0) ? 1 : -1;

//     // Reset player position with a 1-pixel buffer inside the new screen
//     if (lastDirection === 1) {
//         // Entered from the right, start on the left edge
//         postionx = 1;
//     } else if (lastDirection === -1) {
//         // Entered from the left, start on the right edge
//         postionx = width - PLAYER_SIZE - 1;
//     }

//     // CRITICAL: Stop horizontal movement immediately
//     xdir = 0;

//   } else {
//     gameState = 'WIN_SCREEN';
//   }
// }


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

// ⭐️ REMOVED PHYSICS VARIABLES (ydir, GRAVITY, JUMP_FORCE, isOnGround)
// The code now uses only horizontal movement

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
    // Background images
    bg_level1 = loadImage("Images/g1.png");
    bg_level1_5 = loadImage("Images/g2.png");
    bg_level2 = loadImage("Images/g2.png");
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

    // Initialize character's X position in the center
    postionx = width / 2;
    
    // UNIFIED FIX: playerY is initialized at the ground line
    playerY = height / GROUND_Y_POS_RATIO; 

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

function drawLevelScreen() {
    // 1. Draw the current level's image background
    image(ALL_BACKGROUNDS[currentLevel], 0, 0, width, height);

    // 2. Draw the ground plane
                // fill("black");
                // const groundLine = height / GROUND_Y_POS_RATIO;
                // rect(0, groundLine, width, height); 

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

    let promptText = "";

    // Define the prompt text based on the current level
    // switch(currentLevel) {
    //     case 1:
    //         promptText = "Level 1: Choose your path wisely. The decision is permanent.";
    //         break;
    //     case 1.5:
    //         promptText = "Level 1.5: The path splits here. Commit and proceed.";
    //         break;
    //     case 2:
    //         promptText = "Level 2: The air grows thin. You must continue forward.";
    //         break;
    //     case 3:
    //         promptText = "Level 3: The final gate. Victory or failure is just ahead.";
    //         break;
    // }

    const textBoxWidth = 600;
    const textBoxHeight = 80;
    const centerX = width / 2;
    const centerY = height / 5; 

    // Draw semi-transparent background box
    // fill(0, 0, 0, 150); // Black with 150/255 opacity
    // rect(centerX - textBoxWidth / 3, centerY - textBoxHeight / 3, textBoxWidth, textBoxHeight, 10); // 10px rounded corners

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
    // playerY remains fixed at the ground line
    
    row = 0; 
    count = 0; 
    frameTimer = 0;
}

// === MOVEMENT AND TRANSITION LOGIC ===

// ⭐️ RESTORED ORIGINAL ANIMATION LOGIC (No physics)
function handleMovement() {
    let prevRow = row;
    xdir = 0;

    // 1. DETERMINE MOVEMENT AND ACTION 
    // Rows 3 and 4 (Diagonal/Jump) are now free for other actions if needed, 
    // but the code keeps the original horizontal checks.
    
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
    // ⭐️ Vertical position (playerY) is no longer being modified here.
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