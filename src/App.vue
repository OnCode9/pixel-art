<script setup>
// import { supabase } from './services/supabase'
import Button from 'primevue/button'
import Cell from './components/Cell.vue'

const numRows = 50
const numCols = 50
const size = '.5rem'
const cssGridColumnTemplate = `repeat(${numCols}, ${size})`

// async function createCell() {
//   console.log('createCell() - start')

//   const { data, error } = await supabase
//     .from('cells')
//     .upsert({ row: 0, col: 1, value: '#424242' })
//     .select()
// }
</script>

<template>
  <!-- <Button label="Create Cell" @click="createCell" /> -->
  <h1 class="font-medium text-lg">Pixel Art</h1>
  <ul class="list-disc list-inside">
    <li>Number of rows: {{ numRows }}</li>
    <li>Number of columns: {{ numCols }}</li>
  </ul>
  <div class="grid">
    <Cell v-for="index in numCols * numRows" color="#FFFFFF" :size="size"/>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: v-bind(cssGridColumnTemplate);
  outline: solid black;
  width: fit-content;
  height: fit-content;
  margin-top: 1rem;
}
</style>
