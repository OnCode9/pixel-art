<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import ProgressSpinner from 'primevue/progressspinner'
import { useGridStore } from './stores/gridStore'
import {
  insertCell,
  updateCell,
  subscribeToCellsChange,
} from './services/supabase'
import Cell from './components/Cell.vue'
import {
  toRowFromIndex,
  toColFromIndex,
  toGridStoreKey,
  DEFAULT_COLOR
} from '@/utils/grid.js'

let cellsSubscription
const gridStore = useGridStore()

const size = '25px'

onMounted(async () => {
  cellsSubscription = subscribeToCellsChange(onInsert, onUpdate, onDelete)
  await gridStore.initialize()
})

onUnmounted(() => {
  console.log('unmount')
  gridStore.isInitialized = false
  cellsSubscription.unsubscribe()
})

const cssGridColumnTemplate = computed(() => {
  if (gridStore.isInitialized) {
    return `repeat(${gridStore.settings.num_cols}, ${size})`
  } else {
    return 'unset'
  }
})

function onInsert(payload) {
  if (!gridStore.isInitialized) { return }
  console.log('onInsert()', payload)
  gridStore.insert(payload.new)
}

function onUpdate(payload) {
  if (!gridStore.isInitialized) { return }
  console.log('onUpdate()', payload)
  gridStore.update(payload.new)
}

function onDelete(payload) {
  if (!gridStore.isInitialized) { return }
  console.log('onDelete()', payload)
  gridStore.remove(payload.old.id)
}

function colorFromStore(index) {
  if (!gridStore.isInitialized) { return }
  const row = toRowFromIndex(index, gridStore.settings.num_cols)
  const col = toColFromIndex(index, gridStore.settings.num_cols)
  const key = toGridStoreKey({ row, col })
  const color = gridStore?.grid?.[key]?.color
  return (color) ? color : DEFAULT_COLOR
}

async function upsertDatabase({row, col, color}) {
  if (!gridStore.isInitialized) { return }
  const key = toGridStoreKey({ row, col })

  if (gridStore?.grid?.[key]) {
    await updateCell({ id: gridStore?.grid?.[key].id, color })
  } else {
    await insertCell({ row, col, color })
  }
}
</script>

<template>
  <h1 class="font-medium text-lg">Pixel Art</h1>
  <ul class="list-disc list-inside">
    <li>Number of rows: {{ gridStore.settings.num_rows }}</li>
    <li>Number of columns: {{ gridStore.settings.num_cols }}</li>
    <li>Number of cells: {{ gridStore.numCells }}</li>
  </ul>
  <div
    class="grid"
    v-if="gridStore.isInitialized"
  >
    <Cell v-for="index in gridStore.settings.num_cols * gridStore.settings.num_rows"
      :color="colorFromStore(index)"
      :size="size"
      :row="toRowFromIndex(index, gridStore.settings.num_cols)"
      :col="toColFromIndex(index, gridStore.settings.num_cols)"
      :validColors="gridStore.settings.valid_colors"
      @update="upsertDatabase"
    />
  </div>
  <div
    class="card flex justify-content-center"
    v-else
  >
    <ProgressSpinner />
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
