<script setup lang="ts">
import type { Position } from "@/utility/types";
import type { MapId } from "shared/maps";

defineProps<{
  layer: number,
  offset: Position,
  position: Position
  selectedLayer: number
  mapId: MapId
}>()

</script>

<template>
  <div
      class="fixed bg-no-repeat w-full h-screen transition-[background-image]"
      :class="{
          'opacity-0': selectedLayer !== layer,
          'opacity-100': selectedLayer === layer
      }"
      :style="{
          'background-position': `left ${offset.x-position.x}px top ${offset.y-position.y}px`,
          'background-image': `url('/assets/maps/${mapId}/${mapId}-${layer}.jpg')`,
      }"
  />
</template>