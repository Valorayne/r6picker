<script setup lang="ts">
import { useDraggable } from "@/utility/useDraggable";
import type { Layers, MapId } from "shared/maps";
import MapLayer from "@/components/map/MapLayer.vue";
import type { Dimensions, Position } from "shared/types";

const props = defineProps<{
  mapId: MapId,
  dimensions: Dimensions,
  offset: Position,
  layers: Layers
  selectedLayer: number
}>()

const { isDragging, position, startDrag, endDrag, moveMouse } = useDraggable({ dimensions: props.dimensions })

const baseLayer = +Object.keys(props.layers)[0]
const extraLayers = Object.keys(props.layers).map(l => +l).filter(l => l !== baseLayer)
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
    <MapLayer v-for="layer of extraLayers" :layer="layer" :offset="offset" :position="position"
              :selectedLayer="selectedLayer" :mapId="mapId"/>
  </div>
</template>