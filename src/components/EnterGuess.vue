<template>
  <div>
    <form @submit.prevent="submitGuess">
      <label for="yourGuess">What is your guess?</label>
      <input
        type="text"
        placeholder="Enter Guess"
        id="yourGuess"
        :maxlength="guessLength"
        :minlength="guessLength"
        :disabled="isGameOver"
        v-model="guess"
      />
      <button type="submit" :disabled="isGameOver">Guess</button>
    </form>
    <turns-remaining />
  </div>
</template>

<script lang="ts">
import TurnsRemaining from "./TurnsRemaining.vue";

export default {
  components: {
    TurnsRemaining
  },
  data: () => {
    return {
      guess: "1234"
    };
  },
  methods: {
    submitGuess(): void {
      console.log("Guessing " + this.guess, this.$store.state);
      this.$store.dispatch("guess", this.guess);
    }
  },
  computed: {
    guessLength(): number {
      return this.$store.getters.solutionLength;
    },
    isGameOver(): boolean {
      return this.$store.getters.isGameOver;
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
