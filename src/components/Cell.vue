<script setup>
defineProps({
  color: String,
  size: String,
})
</script>

<template>
  <div class="cell"></div>
</template>

<style scoped>
.cell {
  background: v-bind(color);
  width: v-bind(size);
  height: v-bind(size);
}
.cell:hover {
  background-color: grey;
}
</style>
