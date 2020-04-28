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
      const numCorrect = 0; // TODO: Figure this out
      const numMisplaced = 0; // TODO: Figure this out
      if (guess && guess.length === state.solution.length) {
        const move: GameMove = new GameMove(guess, numCorrect, numMisplaced);

        state.history.push(move);
        state.movesLeft--;
      } else {
        console.error('The guess ' + guess + ' did not match the expected length of ' + state.solution.length);
      }
    }
  },
  actions: {},
  modules: {}
});
