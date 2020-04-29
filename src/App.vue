<template>
  <div id="app">
    <h1>Mastermind</h1>
    <p>
      Kata implementation for
      <a href="https://www.TechElevator.com">Tech Elevator</a> by
      <a href="https://www.LinkedIn.com/in/MattEland">Matt Eland</a> as a
      learning exercise for Vue.js and Vuex.
    </p>
    <HistoryList />
    <p v-show="message" class="message">{{ message }}</p>
    <div v-show="!isGameOver">
      <h2>Your Guess</h2>
      <enter-guess />
    </div>
    <div class="restart">
      <a @click="reset" href="#">Restart Game</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import HistoryList from "./components/HistoryList.vue";
import EnterGuess from "./components/EnterGuess.vue";
import store from "./store/index";

export default Vue.extend({
  name: "App",
  components: {
    HistoryList,
    EnterGuess
  },
  store: store,
  created: () => {
    store.dispatch("restart");
  },
  methods: {
    reset(): void {
      store.dispatch("restart");
    }
  },
  computed: {
    isGameOver(): boolean {
      return store.getters.isGameOver;
    },
    message(): string {
      return store.getters.message;
    }
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 2rem;
  margin-left: 2rem;
}
.message {
  font-weight: bold;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.restart {
  margin-top: 2rem;
}
</style>
