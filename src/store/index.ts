import Vue from "vue";
import Vuex from "vuex";
import { GameMove } from '@/models/GameMove';
import { ColorChoice } from '@/models/ColorChoice';

Vue.use(Vuex);

const choices = ['Blue', 'Green', 'Orange', 'Violet', 'Red', 'Yellow'];

function evaluateGuess(guess: string, solution: string): GameMove {

  let numCorrect = 0;
  let numMisplaced = 0;

  // Loop through the characters and count the ones at the correct spot as well as the ones at a misplaced spot
  for (let i = 0; i < guess.length; i++) {
    if (solution[i] === guess[i]) {
      numCorrect++;
    }
    else if (solution.indexOf(guess[i]) >= 0) {
      numMisplaced++;
    }
  }

  // Log to console for ease of demo
  console.log(`Guessed ${guess}. # Correct: ${numCorrect}, # Misplaced: ${numMisplaced}`);
  
  // Add it to the history
  return new GameMove(guess, numCorrect, numMisplaced);
}

function generateSolution(solutionLength: number): string {
  return choices.map(c => c[0]) // Only pay attention to the first letter of each color
                .sort((a, b) => 0.5 - Math.random()) // Random sort order - we want to either increase or decrease the item, so we need a range between -0.5 and 0.5
                .slice(0, solutionLength) // Take the first X of those
                .join(''); // Group them all together into a string without delimiters
}

export default new Vuex.Store({
  state: {
    isGameOver: false,
    movesLeft: 10,
    solution: generateSolution(4),
    history: [new GameMove('This exists only to give Vuex some type insights', 0, 0)],
    message: 'Enter your guess',
    guess: ['Red', 'Orange', 'Yellow', 'Violet']
  },
  mutations: {
    reset(state): void {
      console.log('Resetting game state');
      state.isGameOver = false;
      state.movesLeft = 10;
      state.solution = generateSolution(state.solution.length),
      state.history = [];
      state.message = 'Enter your guess';
    },
    addGuess(state, move: GameMove): void {
      state.history.push(move);

      // Check for game won
      if (move.exactlyCorrect === state.solution.length) {
        state.isGameOver = true;
        state.message = 'You win!';
      }
      // Decrement our turn count and check for game over
      else if (--state.movesLeft <= 0) {
        state.isGameOver = true;
        state.message = 'You lost yet again.';
      }
      
    },
    setMessage(state, message: string): void {
      if (console && console.log) {
        console.log(message);
      }
      state.message = message;
    },
    setColor(state, choice: ColorChoice): void {
      state.guess[choice.index] = choice.color
    },
  },
  actions: {
    changeColor(context, choice: ColorChoice): void {
      context.commit("setColor", choice);
    },
    guess(context): void {
      const guess: string = context.state.guess.map(g => g[0]).join(''); // Translate for an array of color names to a single string with the first letter of each color
      const move: GameMove = evaluateGuess(guess, context.state.solution);
      context.commit("addGuess", move);
    },
    restart(context): void {
      context.commit('reset');
    }
  },
  getters: {
    remainingGuesses: s => {
      if (s.isGameOver) return 'Game Over';

      switch (s.movesLeft) {
        case 0: return 'Game Over';
        case 1: return '1 Guess Remaining';
        default: return s.movesLeft + ' guesses remaining';
      }
    },
    solutionLength: s => s.solution.length,
    guesses: s => s.history,
    isGameOver: s => s.isGameOver,
    message: s => s.message,
    availableOptions: s => choices,
    guess: s => s.guess
  },
  modules: {}
});

