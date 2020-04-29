<template>
  <div>
    <span
      v-for="(char, index) in move.representation"
      :key="'slot' + index"
      :title="getTitle(char)"
      :class="'color' + char"
    >
      {{ char }}
    </span>
    <span class="grading">
      <span
        v-for="(_, index) in move.exactlyCorrect"
        :key="'exact' + index"
        class="correct"
        :title="move.exactlyCorrect + ' exactly correct'"
      >
        &#10003;
      </span>
      <span
        v-for="(_, index) in move.partiallyCorrect"
        :key="'partial' + index"
        class="partial"
        :title="move.partiallyCorrect + ' partially correct'"
      >
        &#9675;
      </span>
    </span>
  </div>
</template>

<script lang="ts">
import { GameMove } from "../models/GameMove";

export default {
  props: {
    move: GameMove
  },
  methods: {
    getTitle(char: string): string {
      switch (char) {
        case "R":
          return "Red";
        case "O":
          return "Orange";
        case "G":
          return "Green";
        case "B":
          return "Blue";
        case "V":
          return "Violet";
        case "Y":
          return "Yellow";
        default:
          return char;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.grading {
  margin-left: 3rem;
  color: green;
}

span {
  font-weight: bold;
}

.colorR {
  color: red;
}
.colorG {
  color: green;
}
.colorB {
  color: blue;
}
.colorV {
  color: purple;
}
.colorY {
  color: goldenrod;
}
.colorO {
  color: orange;
}
</style>
