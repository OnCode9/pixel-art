<script setup>
import { computed, ref } from "vue"
import Dropdown from 'primevue/dropdown'
import OverlayPanel from 'primevue/overlaypanel'

const props = defineProps({
  color: String,
  size: String,
})

const validColors = ref([
    { name: 'White', color: '#FFFFF' },
    { name: 'Blue', color: '#0000FF' },
    { name: 'Red', color: '#FF0000' },
    { name: 'Green', color: '#00FF00' },
    { name: 'Black', color: '#000000' }
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

const cellColor = computed(() => {
  return selectedColor.value.color
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
  background: v-bind(cellColor);
  width: v-bind(size);
  height: v-bind(size);
  border: v-bind(cellBorder);
}
.cell:hover {
  background-color: grey;
}
</style>
