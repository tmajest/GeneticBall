
var game;
var genetics;
var mutationRate = 0.002;
var populationSize = 100;


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

    document.getElementById("amount").innerHTML = generation;
}

function updateMutation(newMutationRate) {
    isPriming = true;
    counter = 0;
    mutationRate = newMutationRate;
    genetics.init();
    game = new Game()

    document.getElementById("mutationAmount").innerHTML = newMutationRate;
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
    drawSpeciesText();

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
    text(generationText, width - w - 30, height - 40);
}

function drawSpeciesText() {
    var speciesText = "Species: " + genetics.populationIndex + " / " + genetics.populationSize;
    var w = textWidth(speciesText);
    fill(255);
    text(speciesText, width - w - 30, height - 20);
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
