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

// Dropdown objects.  Maybe this should move to the database.
const validColors = ref([
  { name: 'White', color: '#FFFFFF' },
  { name: 'Blue', color: '#0000FF' },
  { name: 'Red', color: '#FF0000' },
  { name: 'Green', color: '#00FF00' },
  { name: 'Black', color: '#000000' },
  { name: 'Purple', color: '#800080' },
])

// Figure out what the initial dropdown value is
const selectedColor = ref(determineValidColor(props.color))
const op = ref();
const cellBorder = ref('unset')

const toggle = (event) => {
  op.value.toggle(event);
}

// When the Overlay Panel closes, remove the cell border highlight
const opClosed = () => {
  cellBorder.value = 'unset'
}

// When the Overlay Panel opens, highlight the cell with a border change
const opOpened = () => {
  cellBorder.value = 'solid grey'
}

function determineValidColor(color) {
  return validColors.value.find(item => item.color === color) || validColors.value[0]
}

// Watch the prop.color and update the dropdown selection when it changes
watch(() => props.color, (newColor, oldColor) => {
  // console.log('watch props.color', newColor, oldColor)
  selectedColor.value = determineValidColor(newColor)
})

// Emit the update event when the dropdown changes its selection
watch(selectedColor, (newSelectedColor, oldSelectedColor) => {
  // console.log(`the cell color changed to ${newSelectedColor.name}`)
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
