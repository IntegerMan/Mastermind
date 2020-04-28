<template>
  <p>You have {{ movesLeft }} move(s) remaining.</p>
</template>

<script lang="ts">
export default {
  computed: {
    movesLeft(): number {
      return this.$store.state.movesLeft;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
