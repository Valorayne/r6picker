<script setup lang="ts">
import type { Position } from "shared/types";
import type { MapId } from "shared/maps";

withDefaults(defineProps<{
  layerId: number,
  offset?: Position,
  position: Position
  selectedLayer: number
  mapId: MapId
}>(), {
  offset: { x: 0, y: 0 }
})

</script>

<template>
  <div
      class="fixed bg-no-repeat w-full h-screen transition-[background-image]"
      :class="{
          'opacity-0': selectedLayer !== layerId,
          'opacity-100': selectedLayer === layerId
      }"
      :style="{
          'background-position': `left ${offset.x-position.x}px top ${offset.y-position.y}px`,
          'background-image': `url('/assets/maps/${mapId}/${mapId}-${layerId}.jpg')`,
      }"
  />
</template>