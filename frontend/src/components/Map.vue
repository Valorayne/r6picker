<script setup lang="ts">
import type { MapId } from "shared/maps";
import { useDraggable } from "@/utility/useDraggable";
import { computed, ref } from "vue";
import Overlay from "@/components/Overlay.vue";
import R6Button from "@/components/R6Button.vue"

const props = defineProps<{
  mapId: MapId
  width: number
  height: number
}>()

const { position, startDrag, endDrag, moveMouse, isDragging } = useDraggable({
  width: props.width,
  height: props.height
})

const layers = {
  0: "Basement",
  1: "1st Floor",
  2: "2nd Floor",
  3: "Roof"
}
const offset = {
  x: 674,
  y: 178
}
const baseLayer = computed(() => +Object.keys(layers)[0])

const selectedLayer = ref(0)
const layerClicked = (layerId) => selectedLayer.value = layerId
</script>

<template>
  <div class=" w-full h-screen flex flex-row bg-bank-0 bg-no-repeat bg-black"
       :class="{ 'cursor-move': isDragging }"
       :style="`background-position: left ${-position.x}px top ${-position.y}px`"
       @mousedown="startDrag"
       @mouseup="endDrag"
       @mouseleave="endDrag"
       @mousemove="moveMouse"
  >
    <div v-if="selectedLayer"
         class="bg-no-repeat w-full h-screen transition-[background-image] duration-400"
         :style="{
          'background-position': `left ${offset.x-position.x}px top ${offset.y-position.y}px`,
          'background-image': `url('/assets/maps/bank/bank-${selectedLayer}.jpg')`
        }"
    />
  </div>

  <Overlay class="fixed right-4 bottom-4 flex flex-col space-y-2">
    <R6Button
        :selected="selectedLayer === +layerId"
        v-for="layerId in Object.keys(layers)"
        @click="() => layerClicked(+layerId)"
    >
      {{ layers[layerId] }}
    </R6Button>
  </Overlay>
</template>