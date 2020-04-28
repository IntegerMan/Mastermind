<template>
  <div>
    Past Moves:
    <p v-for="move of moves" v-bind:key="move.representation">
      {{ move.representation }}
    </p>
  </div>
</template>

<script lang="ts">
import { GameMove } from "../models/GameMove";

export default {
  computed: {
    moves(): GameMove[] {
      return [new GameMove("RGBK"), new GameMove("CMYK")];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
