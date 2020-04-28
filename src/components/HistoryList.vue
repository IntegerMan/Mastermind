<template>
  <div>
    <div>
      <h2>Past Moves</h2>
      <p v-for="move of moves" v-bind:key="move.representation">
        {{ move.representation }}
      </p>
    </div>
    <div>
      <h2>Your Move</h2>

      <p>You have {{ movesLeft }} move(s) remaining.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { GameMove } from "../models/GameMove";

export default {
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
