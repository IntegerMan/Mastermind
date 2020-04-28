import Vue from "vue";
import Vuex from "vuex";
import { GameMove } from '@/models/GameMove';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    movesLeft: 10,
    solution: 'CORK',
    history: [
      new GameMove('CMYK', 2, 0),
      new GameMove('ROYG', 1, 1)
    ]
  },
  mutations: {
    guess(state, guess): void {
      const numCorrect = 0; // TODO: Figure this out
      const numMisplaced = 0; // TODO: Figure this out
      const move: GameMove = new GameMove(guess, numCorrect, numMisplaced);

      state.history.push(move);
      state.movesLeft--;
    }
  },
  actions: {},
  modules: {}
});
