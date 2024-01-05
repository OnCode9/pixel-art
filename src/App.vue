<script setup>
import { supabase } from './services/supabase'
import Button from 'primevue/button'
import HelloWorld from './components/HelloWorld.vue'
import Cell from './components/Cell.vue'

const numRows = 100
const numCols = 100
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
  <HelloWorld></HelloWorld>
  <Button label="Create Cell" @click="createCell" />
  <div class="grid">
    <Cell v-for="index in 10000" color="#00FFFF" :size="size"/>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: v-bind(cssGridColumnTemplate);
  outline: solid black;
  width: fit-content;
  height: fit-content;
}
</style>
