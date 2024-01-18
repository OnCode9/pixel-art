import { defineStore, acceptHMRUpdate } from 'pinia'
import { computed, readonly, ref } from 'vue'
import {
  fetchGrid,
  fetchSettings,
  insertCell,
  updateCell
} from '@/services/supabase'
import { toGridStoreKey } from '@/utils/grid.js'

export const useGridStore = defineStore('grid', () => {
  // This structure matches the database
  const grid = ref({})
  const settings = ref({})
  let isInitialized = ref(false)

  async function initialize() {
    console.log('initializing the grid')
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

  const numCells = computed(() => Object.keys(grid.value).length)

  async function update(cell) {
    console.log('updating grid cell')
    const key = toGridStoreKey({ row: cell.row, col: cell.col })
    grid.value[key].color = cell.color
  }

  async function insert(cell) {
    console.log('inserting grid cell')
    const key = toGridStoreKey({ row: cell.row, col: cell.col })
    grid.value[key] = cell
  }

  function remove(id) {
    let removalKey = ''
    for (const [key, value] of Object.entries(grid.value)) {
      if (id === value.id) {
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
    isInitialized,
    settings: readonly(settings),
    initialize,
    numCells,
    insert,
    update,
    remove
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGridStore, import.meta.hot))
}