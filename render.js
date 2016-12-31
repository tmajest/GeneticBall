
var game;
var genetics;
var mutationRate = 0.001;
var populationSize = 200;


var isPriming = false;
var targetGeneration = 0;
var counter = 0;
var primeStep = 1000000;

function updateGeneration(generation) {
    isPriming = true;
    counter = 0;
    targetGeneration = generation;
    genetics.init();
    game = new Game()

    document.getElementById("amount").value = generation;
}

function updateInput(generation) {
    document.getElementById("amount").value = generation;
}

function setup() {
    var canvas = createCanvas(800, 600);
    canvas.parent("canvasContainer");

    game = new Game()
    genetics = new Genetics(mutationRate, populationSize);
    genetics.init();
    isPriming = true;
}

function prime() {
    for (var i = 0; i < primeStep; i++) {
        if (genetics.generation >= targetGeneration) {
            isPriming = false;
            return;
        }

        updateGame(counter);
        counter++;
    }
}

function draw() {
    background(60);

    drawGenerationText();

    if (isPriming) {
        prime();
        return;
    }

    drawGame();
    updateGame(frameCount);
}

function drawGenerationText() {
    var generationText = "Generation: " + genetics.generation;
    var w = textWidth(generationText);
    fill(255);
    text(generationText, width - w - 30, height - 10);
}

function drawGame() {
    // Draw ball
    fill(200);
    ellipse(game.ballVector.x, game.ballVector.y, game.ballRadius * 2);

    // Draw paddle
    rect(game.paddleVector.x, game.paddleVector.y, game.paddleWidth, game.paddleHeight);
}

function updateGame(count) {
    // Update game and AI
    if (count % 10 === 0) {
        var move = genetics.getMove();
        game.movePaddle(move);
    }
    game.update()

    // Update game and AI if we lost
    if (game.lost()) {
        genetics.next(game.score);
        game.init();
    }
}
