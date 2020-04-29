<template>
  <div id="app">
    <h1>Mastermind</h1>
    <p>Kata implementation by Matt Eland</p>
    <HistoryList />
    <div>
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
</style>
