
function Genetics(mutationRate, populationSize) {
    this.population = []
    this.scores = [];
    this.populationSize = populationSize;
    this.mutationRate = mutationRate;
    this.generation = 0;

    this.populationIndex = 0;
    this.move = 0;

    this.init = function() {
        for (var i = 0; i < this.populationSize; i++) {
            this.population.push([]);
            this.scores.push(0);
        }
    };

    this.getMove = function() {
        var species = this.population[this.populationIndex];
        if (this.move >= species.length) {
            species.push(this.getRandomMove());
        }

        var newMove = species[this.move];
        this.move++;
        return newMove;
    };

    this.next = function(score) {
        console.log(score);
        this.scores[this.populationIndex] = score;
        this.populationIndex++;
        this.move = 0;

        if (this.populationIndex >= this.populationSize) {
            this.generateOffspring();
            this.populationIndex = 0;
            this.generation++;
        }
    };

    this.generateOffspring = function() {
        console.log("New generation");
        var pool = [];
        for (var i = 0; i < this.population.length; i++) {
            var p = this.population[i];
            var score = this.scores[i];
            for (var j = 0; j < score / 10 + 1; j++) {
                pool.push(p);
            }
        }

        var offspring = [];
        for (var i = 0; i < this.populationSize; i++) {
            var parent1 = pool[Math.floor(random(pool.length))];
            var parent2 = pool[Math.floor(random(pool.length))];
            var child = this.crossover(parent1, parent2);
            this.mutate(child);
            offspring.push(child);
        }

        this.population = offspring;
    };

    this.crossover = function(parent1, parent2) {
        var l = Math.min(parent1.length, parent2.length);
        var child = [];
        var i;

        // Cross the two parents
        for (i = 0; i < l; i++) {
            if (i % 2 == 0) {
                child.push(parent1[i]);
            } else {
                child.push(parent2[i]);
            }
        }

        // If one parent has more genes, child inherits remaining from that parent
        var longer = parent1.length < parent2.length ? parent1 : parent2;
        for (; i < longer.length; i++) {
            child.push(longer[i]);
        }

        return child;
    };

    this.mutate = function(child) {
        for (var i = 0; i < child.length; i++) {
            if (Math.random() < this.mutationRate) {
                child[i] = this.getRandomMove();
            }
        }
    }

    this.getRandomMove = function() {
        var r = Math.floor(random(3));
        if (r === 0) {
            return -30;
        } else if (r === 1) {
            return 30;
        } else {
            return 0;
        }

    };
}
