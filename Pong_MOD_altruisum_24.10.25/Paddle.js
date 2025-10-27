class Paddle {
    constructor(x, y, w, h, speed, color) {
        this.x = x; // Center X
        this.y = y; // Center Y
        this.w = w;
        this.h = h; // Dynamic height
        this.speed = speed; // 5.6
        this.baseColor = color; // For green/red
    }

    show(isVisible) {
        fill(isVisible ? this.baseColor : 0); // Invisible if opponent is not moving
        // Draw the rectangle using CENTER mode
        rect(this.x, this.y, this.w, this.h);
    }

    moveUp() {
        // Constrain movement based on current dynamic height
        this.y = constrain(this.y - this.speed, this.h / 2, height - this.h / 2);
    }

    moveDown() {
        this.y = constrain(this.y + this.speed, this.h / 2, height - this.h / 2);
    }
}
