
var game;
var genetics;
var mutationRate = 0.001;
var populationSize = 2;
var initialGeneration = 0;

function setup() {
    createCanvas(800, 600);
    game = new Game()
    genetics = new Genetics(mutationRate, populationSize);
    genetics.init();
    prime(initialGeneration)
}

function draw() {
    background(60);

    // Draw ball
    fill(200);
    ellipse(game.ballVector.x, game.ballVector.y, game.ballRadius * 2);

    // Draw paddle
    rect(game.paddleVector.x, game.paddleVector.y, game.paddleWidth, game.paddleHeight);

    // Update game and AI
    if (frameCount % 10 === 0) {
        var move = genetics.getMove();
        game.movePaddle(move);
    }
    game.update()

    // Update game and AI if we lost
    if (game.lost()) {
        genetics.next(game.score);
        game.init();
    }

    // Display Generation
    var generationText = "Generation: " + genetics.generation;
    var w = textWidth(generationText);
    fill(255);
    text(generationText, width - w - 30, height - 10);
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        game.movePaddle(-20);
    } else if (keyCode === RIGHT_ARROW) {
        game.movePaddle(20);
    }
}

function prime(generation) {
    var counter = 0;
    while (genetics.generation < generation) {
        if (counter % 10 === 0) {
            var move = genetics.getMove();
            game.movePaddle(move);
        }
        game.update()

        // Update game and AI if we lost
        if (game.lost()) {
            genetics.next(game.score);
            game.init();
        }
        counter++;
    }
}
