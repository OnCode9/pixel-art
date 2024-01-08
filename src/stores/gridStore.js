import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useGridStore = defineStore('grid', () => {
  // This structure matches the database
  const grid = ref({
    '0-0': { id: 0, created_at: '', row: 0, col: 0, color: '#000000' },
    '0-1': { id: 1, created_at: '', row: 0, col: 1, color: '#FFFFFF' },
    '0-2': { id: 2, created_at: '', row: 0, col: 2, color: '#FF0000' },
    '1-0': { id: 3, created_at: '', row: 1, col: 0, color: '#FFFFFF' },
    '1-1': { id: 4, created_at: '', row: 1, col: 1, color: '#FFFFFF' },
    '1-2': { id: 5, created_at: '', row: 1, col: 2, color: '#FFFFFF' },
    '2-0': { id: 6, created_at: '', row: 2, col: 0, color: '#0000FF' },
    '2-1': { id: 7, created_at: '', row: 2, col: 1, color: '#FFFFFF' },
    '2-2': { id: 8, created_at: '', row: 2, col: 2, color: '#00FF00' },
  })

  // TODO: Add function to initialize the grid from the supabse database

  const numCells = computed(() => Object.keys(grid.value).length)

  return { grid, numCells }
})
