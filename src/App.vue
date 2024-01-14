<script setup>
import { useGridStore } from './stores/gridStore'
// import { supabase } from './services/supabase'
import Button from 'primevue/button'
import Cell from './components/Cell.vue'
import { toRowFromIndex, toColFromIndex } from '@/utils/grid.js'

const gridStore = useGridStore()
gridStore.initialize()

const numRows = 3
const numCols = 3
const size = '25px'
const cssGridColumnTemplate = `repeat(${numCols}, ${size})`

function colorFromStore(index) {
  const row = toRowFromIndex(index, numCols)
  const col = toColFromIndex(index, numCols)
  const gridIndex = `${row}-${col}`
  const color = gridStore?.grid?.[gridIndex]?.color
  return (color) ? color : '#FFFFFF'
}

// async function readSettings() {
//   const { data, error } = await supabase
//     .from('settings')
//     .select()
//   console.log(data)
// }

async function updateCell({row, col, color}) {
  
  const index = `${row}-${col}`
  if (gridStore?.grid?.[index]) {
    // console.log('about to update', row, col, color)
    await gridStore.update({row, col, color})
  } else {
    // console.log('about to insert', row, col, color)
    await gridStore.insert({row, col, color})
  }
}
</script>

<template>
  <!-- <Button label="Read Settings" @click="readSettings" /> -->
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
      :row="toRowFromIndex(index, numCols)"
      :col="toColFromIndex(index, numCols)"
      @update="updateCell"
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
