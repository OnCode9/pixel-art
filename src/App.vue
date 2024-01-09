<script setup>
import { useGridStore } from './stores/gridStore'
// import { supabase } from './services/supabase'
import Button from 'primevue/button'
import Cell from './components/Cell.vue'
import { toRowFromIndex, toColFromIndex } from '@/utils/grid.js'

const gridStore = useGridStore()

const numRows = 3
const numCols = 3
const size = '25px'
const cssGridColumnTemplate = `repeat(${numCols}, ${size})`

function colorFromStore(index) {
  const row = toRowFromIndex(index, numCols)
  const col = toColFromIndex(index, numCols)
  const gridIndex = `${row}-${col}`

  return gridStore.grid[gridIndex].color
}

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
    <li>Number of cells: {{ gridStore.numCells }}</li>
  </ul>
  <div class="grid">
    <Cell v-for="index in numCols * numRows"
      :color="colorFromStore(index)"
      :size="size"
    />
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
