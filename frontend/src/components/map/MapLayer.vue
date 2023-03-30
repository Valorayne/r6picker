<script setup lang="ts">
import type { Position } from "shared/types";
import type { MapId } from "shared/maps";
import { CONSTANTS } from "@/constants";

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
          'background-position': `left ${824-position.x}px top ${250-position.y}px`,
          'background-image': `url('${CONSTANTS.BASE_URL}/assets/maps/${mapId}/${layerId}')`,
      }"
  />
</template>