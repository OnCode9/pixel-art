<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useGridStore } from './stores/gridStore'
import {
  insertCell,
  updateCell,
  subscribeToCellsChange,
} from './services/supabase'
import Button from 'primevue/button'
import Cell from './components/Cell.vue'
import {
  toRowFromIndex,
  toColFromIndex,
  toGridStoreKey,
  DEFAULT_COLOR
} from '@/utils/grid.js'

let cellsSubscription = ref()
const gridStore = useGridStore()

const numRows = 3
const numCols = 3
const size = '25px'
const cssGridColumnTemplate = `repeat(${numCols}, ${size})`

onMounted(() => {
  cellsSubscription = subscribeToCellsChange(onInsert, onUpdate, onDelete)
  gridStore.initialize()
})

onUnmounted(() => {
  cellsSubscription.unsubscribe()
})

function onInsert(payload) {
  console.log('onInsert()', payload)
  gridStore.insert(payload.new)
}

function onUpdate(payload) {
  console.log('onUpdate()', payload)
  gridStore.update(payload.new)
}

function onDelete(payload) {
  console.log('onDelete()', payload)
  gridStore.remove(payload.old.id)
}

function colorFromStore(index) {
  const row = toRowFromIndex(index, numCols)
  const col = toColFromIndex(index, numCols)
  const key = toGridStoreKey({ row, col })
  const color = gridStore?.grid?.[key]?.color
  return (color) ? color : DEFAULT_COLOR
}

// async function readSettings() {
//   const { data, error } = await supabase
//     .from('settings')
//     .select()
//   console.log(data)
// }

async function upsertDatabase({row, col, color}) {
  const key = toGridStoreKey({ row, col })

  if (gridStore?.grid?.[key]) {
    await updateCell({ id: gridStore?.grid?.[key].id, color })
  } else {
    await insertCell({ row, col, color })
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
      @update="upsertDatabase"
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
