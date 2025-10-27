// --- GAME CONSTANTS ---
const INITIAL_PADDLE_HEIGHT = 80;
const SURVIVAL_TIME_LIMIT = 60000; // 60 seconds in milliseconds
const SHRINK_INTERVAL = 10000;    // Shrink every 10 seconds
const MAX_LOSSES = 1; // Game over if the ball is lost once
        
// Ball spawning time:
const THIRD_BALL_TIME = 30000;  // Second ball added at 30 seconds

// --- NEW SPEED CONSTANTS & VARIABLES ---
const INITIAL_BASE_SPEED = 3.5;
let currentBaseSpeed = INITIAL_BASE_SPEED;
let lastSpeedIncreaseTime = 0;
const SPEED_INCREASE_INTERVAL = 10000; // 10 seconds
const SPEED_INCREASE_PERCENT = 1.05;   // 5% increase

// --- GAME STATE VARIABLES ---
let gameState = 'PAUSED'; // 'PAUSED', 'RUNNING', 'WIN', 'LOSS'
let gameStartTime = 0;
let lastShrinkTime = 0;
let timeRemaining = SURVIVAL_TIME_LIMIT;
let gameCanvas; // Variable to store the p5.js canvas element for positioning
        
// --- PADDLE VARIABLES ---
let paddleLeftX = 20;
let paddleLeftY = 200; 
let paddleRightX = 580; // For a 600px wide canvas
let paddleRightY = 200; 
let paddleSpeed = 4.8; 
let paddleHeight = INITIAL_PADDLE_HEIGHT;
let paddleWidth = 10;
        
// --- BALLS ARRAY ---
let balls = []; // Holds multiple ball objects
        
// --- SCORING & VISIBILITY ---
let playerScore = 0; // Total hits on the ball (for final score)
let systemScore = 0; // Times the ball gets past the paddles (Losses)
let leftVisibleTimer = 0;
let rightVisibleTimer = 0;

/**
 * p5.js setup function: runs once at the start.
 */
function setup() {
    // Creates a 600x400 rectangular canvas
    gameCanvas = createCanvas(600, 400); 

    // Center the canvas on the screen
    windowResized(); 

    // Configure drawing settings for the game
    rectMode(CENTER);
    noStroke();
    textSize(40);
    textAlign(CENTER);

    // Pause the drawing loop until the user clicks
    noLoop();
}

/**
 * Function to create and add a new ball to the game.
 */
function addBall() {
    // Use currentBaseSpeed for the initial speed of any new ball
    balls.push({
        x: width / 2, // Centers ball correctly
        y: height / 2,
        speedX: random([-currentBaseSpeed, currentBaseSpeed]),
        speedY: random([-2, 2]),
        size: 10
    });
}

/**
 * p5.js draw function: runs repeatedly while the game is running.
 */
function draw() {
    background(0); // Black background

    // --- RUNNING GAME LOGIC ---
    if (gameState === 'RUNNING') {
        
        // 1. TIME TRACKING & PADDLE SHRINK
        let elapsedTime = millis() - gameStartTime;
        
        timeRemaining = max(0, SURVIVAL_TIME_LIMIT - elapsedTime);

        if (timeRemaining <= 0) {
            gameState = 'WIN';
        }

        // Shrink paddle every 10 seconds
        if (elapsedTime - lastShrinkTime >= SHRINK_INTERVAL) {
            paddleHeight *= 0.95; 
            lastShrinkTime += SHRINK_INTERVAL; 
            paddleHeight = max(5, paddleHeight); // Minimum height limit
        }
        
        // 2. TIME-BASED BALL SPEED INCREASE (New Logic)
        if (elapsedTime - lastSpeedIncreaseTime >= SPEED_INCREASE_INTERVAL) {
            currentBaseSpeed *= SPEED_INCREASE_PERCENT; // Increase base speed by 5%
            lastSpeedIncreaseTime += SPEED_INCREASE_INTERVAL; 
            
            // Apply the new magnitude to all existing balls to instantly accelerate them
            for (let ball of balls) {
                let direction = ball.speedX > 0 ? 1 : -1;
                ball.speedX = direction * currentBaseSpeed;
            }
        }

        // 3. BALL SPAWNING LOGIC (Second ball at 30 seconds)
        if (balls.length === 1 && elapsedTime >= THIRD_BALL_TIME) {
            addBall();
        }
        
        // 4. PADDLE MOVEMENT INPUT
        let leftDownPressed = keyIsDown(83); // S key
        let leftUpPressed = keyIsDown(87); // W key
        let leftMove = 0;
        if (leftDownPressed) { leftMove += paddleSpeed; }
        if (leftUpPressed) { leftMove -= paddleSpeed; }

        let rightDownPressed = keyIsDown(DOWN_ARROW);
        let rightUpPressed = keyIsDown(UP_ARROW);
        let rightMove = 0;
        if (rightDownPressed) { rightMove += paddleSpeed; }
        if (rightUpPressed) { rightMove -= paddleSpeed; }

        // 5. ALTRUISM LOGIC (INSTANTANEOUS VISIBILITY & XOR CHECK)
        
        // P1 (W/S) Visibility check: Visible if ONLY one key is pressed
        let leftBothPressed = leftDownPressed && leftUpPressed;
        if ((leftDownPressed || leftUpPressed) && !leftBothPressed) {
            rightVisibleTimer = 1; // Partner's paddle is visible
        } else {
            rightVisibleTimer = 0; // Partner's paddle is invisible
        }

        // P2 (UP/DOWN) Visibility check: Visible if ONLY one key is pressed
        let rightBothPressed = rightDownPressed && rightUpPressed;
        if ((rightDownPressed || rightUpPressed) && !rightBothPressed) {
            leftVisibleTimer = 1; // Partner's paddle is visible
        } else {
            leftVisibleTimer = 0; // Partner's paddle is invisible
        }

        // 6. PADDLE MOVEMENT & CONSTRAINT
        paddleLeftY = constrain(
            paddleLeftY + leftMove,
            paddleHeight / 2,
            height - paddleHeight / 2
        );
        paddleRightY = constrain(
            paddleRightY + rightMove,
            paddleHeight / 2,
            height - paddleHeight / 2
        );
        
        // --- BALLS LOGIC (LOOP THROUGH ALL BALLS) ---
        for (let i = balls.length - 1; i >= 0; i--) {
            let ball = balls[i];

            // Move the ball
            ball.x += ball.speedX;
            ball.y += ball.speedY;
            
            // Collision with Left Paddle (Requires right player input)
            let leftCollisionLeft = paddleLeftX - paddleWidth / 2 - ball.size / 2;
            let leftCollisionRight = paddleLeftX + paddleWidth / 2 + ball.size / 2;
            let leftCollisionTop = paddleLeftY - paddleHeight / 2 - ball.size / 2;
            let leftCollisionBottom = paddleLeftY + paddleHeight / 2 + ball.size / 2;
            
            if (leftVisibleTimer > 0 && ball.x >= leftCollisionLeft && ball.x <= leftCollisionRight && ball.y >= leftCollisionTop && ball.y <= leftCollisionBottom) {
                // Ball speed is NOT increased here anymore. Just reverse direction.
                ball.speedX = -ball.speedX; 
                playerScore += 1;
                ball.speedY = (ball.y - paddleLeftY) / 20; 
            }

            // Collision with Right Paddle (Requires left player input)
            let rightCollisionLeft = paddleRightX - paddleWidth / 2 - ball.size / 2;
            let rightCollisionRight = paddleRightX + paddleWidth / 2 + ball.size / 2;
            let rightCollisionTop = paddleRightY - paddleHeight / 2 - ball.size / 2;
            let rightCollisionBottom = paddleRightY + paddleHeight / 2 + ball.size / 2;

            if (rightVisibleTimer > 0 && ball.x >= rightCollisionLeft && ball.x <= rightCollisionRight && ball.y >= rightCollisionTop && ball.y <= rightCollisionBottom) {
                // Ball speed is NOT increased here anymore. Just reverse direction.
                ball.speedX = -ball.speedX;
                playerScore += 1;
                ball.speedY = (ball.y - paddleRightY) / 20;
            }

            // Scoring and Boundary Logic for each ball
            if (ball.x < 0 || ball.x > width) {
                systemScore += 1; // Ball lost
                if (systemScore >= MAX_LOSSES) {
                    gameState = 'LOSS'; // Game over loss condition (MAX_LOSSES is 1)
                }
            } else if (ball.y < 0 || ball.y > height) {
                ball.speedY = -ball.speedY; // Bounce off top/bottom walls
            }
        } // End of ball loop
    }

    // --- DRAW PADDLES (INSTANT VISIBILITY - WHITE) ---
    fill(255); // White color

    // Left Paddle: Only draw if P2 is granting visibility
    if (leftVisibleTimer > 0) {
        rect(paddleLeftX, paddleLeftY, paddleWidth, paddleHeight);
    }
    
    // Right Paddle: Only draw if P1 is granting visibility
    if (rightVisibleTimer > 0) {
        rect(paddleRightX, paddleRightY, paddleWidth, paddleHeight);
    }

    // Draw all balls (always white)
    fill(255); 
    for (let ball of balls) {
        square(ball.x, ball.y, ball.size);
    }

    // --- UI AND GAME STATE DISPLAY ---

    if (gameState === 'RUNNING') {
        // Display remaining time and losses
        textAlign(LEFT);
        let timeSec = Math.ceil(timeRemaining / 1000);
        text(`Time: ${timeSec}s`, width * 0.05, height * 0.1);
        textAlign(RIGHT);
        text(`Lost: ${systemScore}/1`, width * 0.95, height * 0.1); 

    } else {
        noLoop(); 
        textAlign(CENTER);
        textSize(60);

        if (gameState === 'WIN') {
            fill(255); 
            text('SURVIVED!', width / 2, height / 2 - 40);
        } else if (gameState === 'LOSS') {
            fill(255, 50, 50); 
            text('GAME OVER', width / 2, height / 2 - 40);
        } else {
            fill(255);
            text('Click to Start', width / 2, height / 2 - 20);
        }
        
        textSize(24);
        fill(255);
        text(`Hits: ${playerScore}`, width / 2, height / 2);
        text('Click to Restart', width / 2, height / 2 + 40);
        textSize(18);
        text('P1: W/S | P2: UP/DOWN', width / 2, height / 2 + 70);
        text('Hold ONLY one key to maintain visibility!', width / 2, height / 2 + 100);
    }
}

/**
 * Function to reset all balls for a new game.
 */
function resetGameBalls() {
    balls = []; // Clear all existing balls
    addBall(); // Add the initial ball
}

/**
 * p5.js mousePressed function: handles starting/restarting the game.
 */
function mousePressed() {
    if (gameState !== 'RUNNING') {
        // Reset all state variables for a new game
        playerScore = 0;
        systemScore = 0;
        paddleHeight = INITIAL_PADDLE_HEIGHT;
        leftVisibleTimer = 0;
        rightVisibleTimer = 0;
        
        // Reset speed variables for new game
        currentBaseSpeed = INITIAL_BASE_SPEED; 

        // Ensure paddles start exactly in the middle
        paddleLeftY = height / 2;
        paddleRightY = height / 2;
        
        gameState = 'RUNNING';
        gameStartTime = millis();
        lastShrinkTime = gameStartTime;
        lastSpeedIncreaseTime = gameStartTime; // Initialize speed increase timer
        timeRemaining = SURVIVAL_TIME_LIMIT;
        
        resetGameBalls(); // Use the new function to set up balls
        loop(); // Start the draw loop
    }
}

/**
 * p5.js function to handle window resizing for centering the canvas.
 */
function windowResized() {
    // Recalculate position to center the canvas
    if (gameCanvas) {
        let x = (windowWidth - width) / 2;
        let y = (windowHeight - height) / 2;
        gameCanvas.position(x, y);
    }
}
