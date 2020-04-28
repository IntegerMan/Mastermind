<template>
  <div id="app">
    <h1>Mastermind</h1>
    <p>Kata implementation by Matt Eland</p>
    <HistoryList />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HistoryList from "./components/HistoryList.vue";

@Component({
  components: {
    HistoryList
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
