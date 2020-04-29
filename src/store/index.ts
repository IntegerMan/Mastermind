import Vue from "vue";
import Vuex from "vuex";
import { GameMove } from '@/models/GameMove';

Vue.use(Vuex);

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
  const move: GameMove = new GameMove(guess, numCorrect, numMisplaced);
  return move;
}

export default new Vuex.Store({
  state: {
    isGameOver: false,
    movesLeft: 10,
    solution: 'Replaced once the application starts and reset is called',
    history: [new GameMove('History will be cleared', 0, 0)]
  },
  mutations: {
    reset(state): void {
      console.log('Resetting game state');
      state.isGameOver = false;
      state.movesLeft = 10;
      state.solution = '1234'; // TODO: Randomly generate
      state.history = [];
    },
    addGuess(state, move: GameMove): void {
      state.history.push(move);

      // Decrement our turn count and check for game over
      if (--state.movesLeft <= 0) {
        state.isGameOver = true;
      }
    }
  },
  actions: {
    guess(context, guess: string): void {
      const solution = context.state.solution;
      if (guess && guess.length === solution.length) {
        const move: GameMove = evaluateGuess(guess, context.state.solution);
        context.commit("addGuess", move);
      } else {
        console.error('The guess ' + guess + ' did not match the expected length of ' + context.state.solution.length);
      }
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
    isGameOver: s => s.isGameOver
  },
  modules: {}
});

