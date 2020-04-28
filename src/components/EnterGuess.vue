<template>
  <div>
    <div>
      <label for="yourGuess">What is your guess?</label>
      <input
        type="text"
        placeholder="Enter Guess"
        id="yourGuess"
        :maxlength="guessLength"
        :minlength="guessLength"
        v-model="guess"
      />
      <button>Guess</button>
    </div>
    <turns-remaining />
  </div>
</template>

<script lang="ts">
import TurnsRemaining from "./TurnsRemaining.vue";

export default {
  components: {
    TurnsRemaining
  },
  props: {
    guess: String
  },
  computed: {
    guessLength(): number {
      return 4; // TODO: Get from store
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
input {
  margin-left: 1rem;
  width: 100px;
}
button {
  margin-left: 0.5rem;
}
</style>
