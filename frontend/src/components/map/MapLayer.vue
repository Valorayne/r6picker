<script setup lang="ts">
import type { PositionDto } from "shared/types";
import type { MapId } from "shared/maps";
import { CONSTANTS } from "@/constants";

withDefaults(defineProps<{
  layerId: number,
  offset?: PositionDto,
  position: PositionDto
  selectedLayer: number
  mapId: MapId
}>(), {
  offset: { x: 0, y: 0 }
})

</script>

<template>
  <div
      class="fixed bg-no-repeat w-full h-screen"
      :class="{
          'opacity-0': selectedLayer !== layerId,
          'opacity-100': selectedLayer === layerId
      }"
      :style="{
          'background-position': `left ${offset.x-position.x}px top ${offset.y-position.y}px`,
          'background-image': `url('${CONSTANTS.BASE_URL}/assets/maps/${mapId}/${layerId}')`,
      }"
  />
</template>