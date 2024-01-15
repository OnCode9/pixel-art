<script setup>
import { ref, watch } from "vue"
import Dropdown from 'primevue/dropdown'
import OverlayPanel from 'primevue/overlaypanel'

const props = defineProps({
  color: String,
  size: String,
  row: Number,
  col: Number,
})

const emit = defineEmits(['update'])

const validColors = ref([
  { name: 'White', color: '#FFFFFF' },
  { name: 'Blue', color: '#0000FF' },
  { name: 'Red', color: '#FF0000' },
  { name: 'Green', color: '#00FF00' },
  { name: 'Black', color: '#000000' },
  { name: 'Purple', color: '#800080' },
])

const selectedColor = ref(validColors.value.find(item => item.color === props.color) || validColors.value[0])
const op = ref();
const cellBorder = ref('unset')

const toggle = (event) => {
  op.value.toggle(event);
}

const opClosed = () => {
  console.log('op closed')
  cellBorder.value = 'unset'
}

const opOpened = () => {
  console.log('op opened')
  cellBorder.value = 'solid grey'
}

watch(selectedColor, (newSelectedColor, oldSelectedColor) => {
  console.log(`the cell color changed to ${newSelectedColor.name}`)
  emit('update', { row: props.row, col: props.col, color: newSelectedColor.color })
})
</script>

<template>
  <div class="cell" @click="toggle">
    <OverlayPanel ref="op" showCloseIcon @show="opOpened" @hide="opClosed">
      <p>{{ color }}</p>
      <Dropdown v-model="selectedColor" :options="validColors" optionLabel="name" @change="toggle"/>
    </OverlayPanel>
  </div>
</template>

<style scoped>
.cell {
  background: v-bind(color);
  width: v-bind(size);
  height: v-bind(size);
  border: v-bind(cellBorder);
}
.cell:hover {
  background-color: grey;
}
</style>
