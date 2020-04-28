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
        v-model="guess"
      />
      <button type="submit">Guess</button>
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
      this.$store.commit("guess", this.guess);
    }
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
