<template>
  <div>
    {{ move.representation }}
    <span>
      ({{ move.exactlyCorrect }} correct, {{ move.partiallyCorrect }} misplaced)
    </span>
  </div>
</template>

<script lang="ts">
import { GameMove } from "../models/GameMove";

export default {
  props: {
    move: GameMove
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
