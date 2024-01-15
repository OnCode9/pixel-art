import { defineStore } from 'pinia'
import { computed, readonly, ref } from 'vue'
import {
  fetchGrid,
  insertCell,
  updateCell
} from '@/services/supabase'
import { toGridStoreKey } from '@/utils/grid.js'

export const useGridStore = defineStore('grid', () => {
  // This structure matches the database
  const grid = ref({})

  async function initialize() {
    grid.value = {}
    const cells = await fetchGrid()

    cells.forEach((cell) => {
      const key = toGridStoreKey({ row: cell.row, col: cell.col })
      grid.value[key] = cell
    })
  }

  const numCells = computed(() => Object.keys(grid.value).length)

  async function update(cell) {
    const key = toGridStoreKey({ row: cell.row, col: cell.col })
    grid.value[key].color = cell.color
  }

  async function insert(cell) {
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

  return { grid: readonly(grid), initialize, numCells, insert, update, remove }
})
