<script setup>
import { supabase } from './services/supabase'
import Button from 'primevue/button'
import Cell from './components/Cell.vue'

const numRows = 10
const numCols = 10
const size = '.5rem'
const cssGridColumnTemplate = `repeat(${numCols}, ${size})`

async function createCell() {
  console.log('createCell() - start')

const { data, error } = await supabase
  .from('cells')
  .upsert({ row: 0, col: 1, value: '#424242' })
  .select()
}
</script>

<template>
  <Button label="Create Cell" @click="createCell" />
  <div class="grid">
    <Cell v-for="index in numCols * numRows" color="#FFFFFF" :size="size"/>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: v-bind(cssGridColumnTemplate);
  outline: solid black;
  width: fit-content;
  height: fit-content;
  margin-top: 1rem;
}
</style>
