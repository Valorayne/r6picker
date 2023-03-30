<script setup lang="ts">
import { useDraggable } from "@/utility/useDraggable";
import type { LayerDto, MapId } from "shared/maps";
import MapLayer from "@/components/map/MapLayer.vue";
import type { Dimensions } from "shared/types";
import { computed } from "vue";

const props = defineProps<{
  mapId: MapId,
  dimensions: Dimensions,
  layers: LayerDto[]
  selectedLayer: number
}>()

const { isDragging, position, startDrag, endDrag, moveMouse } = useDraggable({ dimensions: props.dimensions })
const extraLayers = computed(() => props.layers.slice(1))

</script>

<template>
  <div class="w-full h-screen flex flex-row bg-bank-0 bg-no-repeat bg-black"
       :class="{ 'cursor-move': isDragging }"
       :style="`background-position: left ${-position.x}px top ${-position.y}px`"
       @mousedown="startDrag"
       @mouseup="endDrag"
       @mouseleave="endDrag"
       @mousemove="moveMouse"
  >
    <MapLayer v-for="layer of extraLayers" :layerId="layer.id" :offset="layer.offset" :position="position"
              :selectedLayer="selectedLayer" :mapId="mapId"/>
  </div>
</template>