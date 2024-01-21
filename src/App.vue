<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import ProgressSpinner from 'primevue/progressspinner'
import { useGridStore } from './stores/gridStore'
import Cell from './components/Cell.vue'
import {
  toRowFromIndex,
  toColFromIndex,
  toGridStoreKey,
  DEFAULT_COLOR
} from '@/utils/grid.js'

const gridStore = useGridStore()

const size = '25px'

onMounted(async () => {
  await gridStore.initialize()
})

onUnmounted(() => {
  console.log('unmount')
  gridStore.uninitialize()
})

const cssGridColumnTemplate = computed(() => {
  if (gridStore.isInitialized) {
    return `repeat(${gridStore.settings.num_cols}, ${size})`
  } else {
    return 'unset'
  }
})

function colorFromStore(index) {
  if (!gridStore.isInitialized) { return }
  const row = toRowFromIndex(index, gridStore.settings.num_cols)
  const col = toColFromIndex(index, gridStore.settings.num_cols)
  const key = toGridStoreKey({ row, col })
  const color = gridStore?.grid?.[key]?.color
  return (color) ? color : DEFAULT_COLOR
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
      @update="gridStore.upsert"
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
