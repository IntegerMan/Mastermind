import Vue from "vue";
import Vuex from "vuex";
import { GameMove } from '@/models/GameMove';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isGameOver: false,
    movesLeft: 10,
    solution: 'Replaced once the application starts and reset is called',
    history: []
  },
  mutations: {
    reset(state): void {
      console.log('Resetting game state');
      state.isGameOver = false;
      state.movesLeft = 10;
      state.solution = '1234'; // TODO: Randomly generate
      state.history = [];
    },
    guess(state, guess): void {
      if (guess && guess.length === state.solution.length) {
        let numCorrect = 0; // TODO: Figure this out
        let numMisplaced = 0; // TODO: Figure this out

        // Loop through the characters and count the ones at the correct spot as well as the ones at a misplaced spot
        for (let i = 0; i < guess.length; i++) {
          if (state.solution[i] === guess[i]) {
            numCorrect++;
          } else if (state.solution.indexOf(guess[i]) >= 0) {
            numMisplaced++;
          }
        }

        // Log to console for ease of demo
        console.log(`Guessed ${guess}. # Correct: ${numCorrect}, # Misplaced: ${numMisplaced}`);

        // Add it to the history
        const move: GameMove = new GameMove(guess, numCorrect, numMisplaced);
        state.history.push(move);

        // Decrement our turn count
        state.movesLeft--;
      } else {
        console.error('The guess ' + guess + ' did not match the expected length of ' + state.solution.length);
      }
    }
  },
  actions: {},
  modules: {}
});
