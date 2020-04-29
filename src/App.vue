<template>
  <div id="app">
    <h1>Mastermind</h1>
    <p>Kata implementation by Matt Eland</p>
    <p class="message">{{ message }}</p>
    <HistoryList />
    <div v-show="!isGameOver">
      <h2>Your Guess</h2>
      <enter-guess />
    </div>
    <a @click="reset" href="#">Restart Game</a>
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
    console.log('App created!');
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
</style>
