import { createClient } from '@supabase/supabase-js'

const CELLS = `${import.meta.env.VITE_TABLE_PREFIX}cells`
const SETTINGS = `${import.meta.env.VITE_TABLE_PREFIX}settings`

export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

export async function updateCell({id, color}) {
  console.log('updateCell', id, color)
  const { error } = await supabase
    .from(CELLS)
    .update({ color: color })
    .eq('id', id)
}

export async function insertCell({row, col, color}) {
  console.log('insertCell')
  const { data, error } = await supabase
    .from(CELLS)
    .insert({row, col, color})
    .select()

  return data[0]
}


export async function fetchGrid() {
  const { data, error } = await supabase
    .from(CELLS)
    .select()

  return data
}

export function subscribeToCellsChange(onInsert, onUpdate, onDelete) {
  console.log('subscribe to cells')
  return supabase
    .channel('cells-changes')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: CELLS }, onInsert)
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: CELLS }, onUpdate)
    .on('postgres_changes', { event: 'DELETE', schema: 'public', table: CELLS }, onDelete)
    .subscribe()
}

export async function fetchSettings() {
  const { data, error } = await supabase
    .from(SETTINGS)
    .select()

  return data[0]
}
