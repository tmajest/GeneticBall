# GeneticBall

Genetic ball simulation here: https://tmajest.github.io/GeneticBall/

Genetic algorithm that learns how to play a simplified version of breakout.
Each species have DNA made up of moves - either left, right, or standing still.  A species will survive longer
if its DNA moves result in the paddle hitting the ball.

Each generation consists of 200 species.  Species that survive longer by keeping the ball in bounds will have a greater chance of reproducing.  After each species in the generation plays the game, two species at at time are chosen to reproduce and will have their DNA crossed.  There is also a chance that during reproduction, one of the genes will be mutated.  These mutations sometimes lead to more or less successful offspring.

With each generation, each species should get better at playing the game since the species that are more successful
will have a greater chance of reproducing.  Fast forward to future generations of the species to see its progress.
