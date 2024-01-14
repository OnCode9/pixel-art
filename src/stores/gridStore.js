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
    const cells = await fetchGrid()

    cells.forEach((cell) => {
      const key = toGridStoreKey({ row: cell.row, col: cell.col })
      grid.value[key] = cell
    })
  }

  const numCells = computed(() => Object.keys(grid.value).length)

  async function update({row, col, color}) {
    const key = toGridStoreKey({ row, col })
    grid.value[key].color = color
    await updateCell({ id: grid.value[key].id, color})
  }

  async function insert({row, col, color}) {
    const key = toGridStoreKey({ row, col })
    grid.value[key] = await insertCell({ row, col, color })
  }

  return { grid: readonly(grid), initialize, numCells, insert, update }
})
