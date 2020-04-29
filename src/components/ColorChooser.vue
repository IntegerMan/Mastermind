<template>
  <select v-model="choice" :id="'slot' + index" @change="onSelected">
    <option v-for="option of options" v-bind:key="option" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script lang="ts">
export default {
  props: {
    index: Number
  },
  data: function() {
    return { choice: "Red" };
  },
  computed: {
    options(): string[] {
      return this.$store.getters.availableOptions;
    }
  },
  methods: {
    onSelected(): void {
      console.log("Index " + this.index + " Select " + this.choice);
    }
  },
  created() {
    this.choice = this.$store.getters.availableOptions[this.index];
  }
};
</script>

<style scoped lang="scss"></style>
