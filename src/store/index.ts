import Vue from "vue";
import Vuex from "vuex";
import { GameMove } from '@/models/GameMove';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    movesLeft: 10,
    history: [
      new GameMove('CMYK'),
      new GameMove('ROYG')
    ]
  },
  mutations: {},
  actions: {},
  modules: {}
});
