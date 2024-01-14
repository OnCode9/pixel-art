import { defineStore } from 'pinia'
import { computed, readonly, ref } from 'vue'
import { supabase, fetchGrid, insertCell, updateCell } from '@/services/supabase'

export const useGridStore = defineStore('grid', () => {
  // This structure matches the database
  const grid = ref({})

  async function initialize() {
    const cells = await fetchGrid()

    cells.forEach((cell) => {
      const index = `${cell.row}-${cell.col}`
      grid.value[index] = cell
    })
  }

  const numCells = computed(() => Object.keys(grid.value).length)

  async function update({row, col, color}) {
    const index = `${row}-${col}`
    // console.log(index, grid.value)
    grid.value[index].color = color
    await updateCell({ id: grid.value[index].id, color})
  }

  async function insert({row, col, color}) {
    const index = `${row}-${col}`
    // console.log(index, grid.value)
    grid.value[index] = await insertCell({ row, col, color })
  }

  return { grid: readonly(grid), initialize, numCells, insert, update }
})
