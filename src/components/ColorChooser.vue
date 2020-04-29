<template>
  <select v-model="choice" :id="'slot' + index" @change="onSelected">
    <option v-for="option of options" v-bind:key="option" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script lang="ts">
import { ColorChoice } from "../models/ColorChoice";
export default {
  props: {
    index: Number
  },
  data: function() {
    return { choice: "" };
  },
  computed: {
    options(): string[] {
      return this.$store.getters.availableOptions;
    }
  },
  methods: {
    onSelected(): void {
      const choice = new ColorChoice(this.index, this.choice);
      this.$store.dispatch("changeColor", choice);
    }
  },
  created() {
    this.choice = this.$store.getters.guess[this.index];
  }
};
</script>

<style scoped lang="scss"></style>
