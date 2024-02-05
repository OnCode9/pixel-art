import { createClient } from '@supabase/supabase-js'

export default class Supabase {
  #supabaseClient
  #cells
  #settings

  constructor({ url, key, tablePrefix }) {
    this.#supabaseClient = createClient(url, key)
    this.#cells = `${tablePrefix}cells`
    this.#settings = `${tablePrefix}settings`
  }

  async updateCell({id, color}) {
    console.log('updateCell', id, color)
    const { error } = await this.#supabaseClient
      .from(this.#cells)
      .update({ color: color })
      .eq('id', id)
  }

  async insertCell({row, col, color}) {
    console.log('insertCell')
    const { data, error } = await this.#supabaseClient
      .from(this.#cells)
      .insert({row, col, color})
      .select()

    return data[0]
  }

  async fetchGrid() {
    const { data, error } = await this.#supabaseClient
      .from(this.#cells)
      .select()

    return data
  }

  subscribeToCellsChange(onInsert, onUpdate, onDelete) {
    console.log('subscribe to cells')
    return this.#supabaseClient
      .channel('cells-changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: this.#cells }, onInsert)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: this.#cells }, onUpdate)
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: this.#cells }, onDelete)
      .subscribe()
  }

  async fetchSettings() {
    const { data, error } = await this.#supabaseClient
      .from(this.#settings)
      .select()

    return data[0]
  }
}
