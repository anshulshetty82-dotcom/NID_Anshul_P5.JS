class Ball {
    constructor(x, y, xSpeed, ySpeed) {
        this.x = x;
        this.y = y;
        this.size = 10;
        this.speedX = xSpeed;
        this.speedY = ySpeed;
    }

    show() {
        fill(255); // White ball
        square(this.x, this.y, this.size);
    }

    move() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    checkCollisionWall() {
        // Top and Bottom wall collision
        if (this.y - this.size / 2 < 0 || this.y + this.size / 2 > height) {
            this.speedY *= -1;
        }
    }

    checkCollisionPaddle(paddle) {
        // Simplified AABB collision check (using center mode)
        if (this.x - this.size / 2 < paddle.x + paddle.w / 2 &&
            this.x + this.size / 2 > paddle.x - paddle.w / 2 &&
            this.y - this.size / 2 < paddle.y + paddle.h / 2 &&
            this.y + this.size / 2 > paddle.y - paddle.h / 2) {

            // Reverse X speed and add a bit of spin
            this.speedX *= -1;
            this.speedY = (this.y - paddle.y) / 10;
            
            // The user's original code had a sound ping here
            // if (typeof pingSound !== 'undefined') pingSound.play();
        }
    }

    checkWinner() {
        // Player 2 scores (Ball passes left edge)
        if (this.x < 0) {
            return 2;
        }
        // Player 1 scores (Ball passes right edge)
        if (this.x > width) {
            return 1;
        }
        return 0; // No score
    }

    reset() {
        this.x = width / 2;
        this.y = height / 2;
        // High speed setting from previous version
        this.speedX = random([-4.5, 4.5]);
        this.speedY = random([-2, 2]);
    }
}