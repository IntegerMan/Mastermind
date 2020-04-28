<template>
  <div>
    <h2>Past Guesses</h2>
    <HistoryEntry
      v-for="(move, index) of moves"
      v-bind:key="index"
      :move="move"
    />
  </div>
</template>

<script lang="ts">
import { GameMove } from "../models/GameMove";
import HistoryEntry from "./HistoryEntry.vue";

export default {
  components: {
    HistoryEntry
  },
  computed: {
    moves(): GameMove[] {
      return this.$store.state.history;
    },
    movesLeft(): number {
      return this.$store.state.movesLeft;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
