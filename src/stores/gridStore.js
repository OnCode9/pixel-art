import { defineStore } from 'pinia'
import { computed, readonly, ref } from 'vue'
import {
  fetchGrid,
  fetchSettings,
  subscribeToCellsChange,
  insertCell,
  updateCell
} from '@/services/supabase'
import { toGridStoreKey } from '@/utils/grid.js'

export const useGridStore = defineStore('grid', () => {
  // This structure matches the database
  const grid = ref({})
  const settings = ref({})
  let isInitialized = ref(false)
  let cellsSubscription

  async function initialize() {
    console.log('initializing the grid')

    cellsSubscription = subscribeToCellsChange(onInsert, onUpdate, onDelete)

    grid.value = {}
    const cells = await fetchGrid()

    cells.forEach((cell) => {
      const key = toGridStoreKey({ row: cell.row, col: cell.col })
      grid.value[key] = cell
    })

    console.log('fetching settings')
    settings.value = await fetchSettings()
    
    isInitialized.value = true
  }

  function uninitialize() {
    isInitialized.value = false
    cellsSubscription.unsubscribe()
  }

  const numCells = computed(() => Object.keys(grid.value).length)

  async function onInsert(payload) {
    if (!isInitialized.value) { return }
    console.log('inserting grid cell')

    const key = toGridStoreKey({ row: payload.new.row, col: payload.new.col })
    grid.value[key] = payload.new
  }

  async function onUpdate(payload) {
    if (!isInitialized.value) { return }
    console.log('updating grid cell')

    const key = toGridStoreKey({ row: payload.new.row, col: payload.new.col })
    grid.value[key].color = payload.new.color
  }

  function onDelete(payload) {
    if (!isInitialized.value) { return }
    console.log('deleting grid cell')

    let removalKey = ''
    for (const [key, value] of Object.entries(grid.value)) {
      if (payload.old.id === value.id) {
        removalKey = key
        break
      }
    }

    if (removalKey !== '') {
      delete grid.value[removalKey]
    }
  }

  return {
    grid: readonly(grid),
    isInitialized: readonly(isInitialized),
    settings: readonly(settings),
    initialize,
    uninitialize,
    numCells,
  }
})
