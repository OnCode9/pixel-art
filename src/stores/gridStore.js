import { defineStore } from 'pinia'
import { computed, readonly, ref } from 'vue'
import Supabase from '@/services/supabase'
import { insertCell, updateCell } from '@/services/pixelArtApi'
import { toGridStoreKey } from '@/utils/grid.js'

export const useGridStore = defineStore('grid', () => {
  // This structure matches the database
  const grid = ref({})
  const settings = ref({})
  let isInitialized = ref(false)
  const client = new Supabase({
    url: import.meta.env.VITE_SUPABASE_URL,
    key: import.meta.env.VITE_SUPABASE_KEY_READONLY,
    tablePrefix: import.meta.env.VITE_TABLE_PREFIX
  })
  let cellsSubscription

  /**
   * Initializes the grid store by doing the following:
   * - subscribes to realtime database updates
   * - fetches the grid data from the database
   * - fetches the grid settings from the database
   * - sets the internal state to be initialized 
   */
  async function initialize() {
    console.log('initializing the grid')

    cellsSubscription = client.subscribeToCellsChange(onInsert, onUpdate, onDelete)

    grid.value = {}
    const cells = await client.fetchGrid()

    cells.forEach((cell) => {
      const key = toGridStoreKey({ row: cell.row, col: cell.col })
      grid.value[key] = cell
    })

    console.log('fetching settings')
    settings.value = await client.fetchSettings()
    
    isInitialized.value = true
  }

  /**
   * Stores the number of cells in the grid with a color value.
   */
  const numCells = computed(() => Object.keys(grid.value).length)

  /**
   * Insertion handler for realtime events from the database.  When called, a new cell will be added
   * to the grid store.
   *
   * @param {Object} payload 
   * @returns Empty if the grid store is not initialized.
   */
  async function onInsert(payload) {
    if (!isInitialized.value) { return }
    console.log('inserting grid cell')

    const key = toGridStoreKey({ row: payload.new.row, col: payload.new.col })
    grid.value[key] = payload.new
  }

  /**
   * Update handler for realtime events from the database.  When called, the cell will have its
   * color updated.
   *
   * @param {Object} payload 
   * @returns Empty if the grid store is not initialized.
   */
  async function onUpdate(payload) {
    if (!isInitialized.value) { return }
    console.log('updating grid cell')

    const key = toGridStoreKey({ row: payload.new.row, col: payload.new.col })
    grid.value[key].color = payload.new.color
  }

  /**
   * Delete handler for realtime events from the database.  When called, the cell will removed from
   * the grid store.
   *
   * @param {Object} payload 
   * @returns Empty if the grid store is not initialized.
   */
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

  /**
   * Uninitializes the grid store by doing the following:
   * - unsubscribes to realtime database updates
   * - sets the internal state to be not initialized
   */
  function uninitialize() {
    isInitialized.value = false
    cellsSubscription.unsubscribe()
  }

  /**
   * Upsert the provided cell object to the database.
   *
   * @param {Object} cell The cell to upsert { row, col, color }
   * @returns Empty if the grid store is not initialized.
   */
  async function upsert({ row, col, color }) {
    if (!isInitialized.value) { return }
    const key = toGridStoreKey({ row, col })
  
    if (grid.value[key]) {
      await updateCell({ id: grid.value[key].id, color })
    } else {
      await insertCell({ row, col, color })
    }
  }

  return {
    grid: readonly(grid),
    isInitialized: readonly(isInitialized),
    settings: readonly(settings),
    initialize,
    uninitialize,
    upsert,
    numCells,
  }
})
