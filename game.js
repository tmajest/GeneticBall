
function Game() {
    this.ballVector = createVector(width / 4, height / 3);
    this.ballSpeed = createVector(-4, 4);
    this.ballRadius = 10;
    this.score = 0;

    this.paddleWidth = 150;
    this.paddleHeight = 20;
    this.paddleVector = createVector(width / 3, height - this.paddleHeight);

    this.init = function() {
        this.ballVector = createVector(width / 4, height / 3);
        this.ballSpeed = createVector(-4, 4);
        this.ballRadius = 10;
        this.score = 0;
        this.paddleVector = createVector(width / 3, height - this.paddleHeight);
    }

    this.update = function() {
        if (this.ballVector.x - this.ballRadius <= 0 || this.ballVector.x + this.ballRadius >= width) {
            this.ballSpeed.x *= -1;
        }
        if (this.ballVector.y <= 0) {
            this.ballSpeed.y *= -1;
        }
        if (this.hitPaddle()) {
            this.ballSpeed.y *= -1;
            this.ballVector.y -= this.ballRadius;
        }

        this.ballVector.x += this.ballSpeed.x;
        this.ballVector.y += this.ballSpeed.y;

        this.score++;
    };

    this.lost = function() {
        return this.ballVector.y + this.ballRadius >= height;
    };

    this.hitPaddle = function() {
        return this.ballVector.x - this.ballRadius >= this.paddleVector.x &&
               this.ballVector.x + this.ballRadius <= this.paddleVector.x + this.paddleWidth &&
               this.ballVector.y + this.ballRadius >= this.paddleVector.y &&
               this.ballVector.y - this.ballRadius <= this.paddleVector.y + this.paddleHeight;
    };

    this.movePaddle = function(x) {
        this.paddleVector.x += x;
        if (this.paddleVector.x < 0) {
            this.paddleVector.x = 0;
        }
        if (this.paddleVector.x + this.paddleWidth > width) {
            this.paddleVector.x = width - this.paddleWidth;
        }
    };
}
