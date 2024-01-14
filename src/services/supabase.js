import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

export async function updateCell({id, color}) {
  console.log('updateCell', id, color)
  const { error } = await supabase
    .from('cells')
    .update({ color: color })
    .eq('id', id)
}

export async function insertCell({row, col, color}) {
  console.log('insertCell')
  const { data, error } = await supabase
    .from('cells')
    .insert({row, col, color})
    .select()
  // console.log(data[0])
  return data[0]
}

export async function fetchGrid() {
  const { data, error } = await supabase
    .from('cells')
    .select()
  // console.log(data)
  return data
}