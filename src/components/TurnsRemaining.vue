<template>
  <p>{{ movesLeft }}</p>
</template>

<script lang="ts">
export default {
  computed: {
    movesLeft(): number {
      return this.$store.getters.remainingGuesses;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
