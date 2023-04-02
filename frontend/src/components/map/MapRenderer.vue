<script setup lang="ts">
import { useDraggable } from "@/utility/useDraggable";
import type { LayerDto, MapId } from "shared/maps";
import type { ObjectiveDto } from "shared/objectives";
import MapLayer from "@/components/map/MapLayer.vue";
import type { DimensionsDto } from "shared/types";
import { computed } from "vue";
import { CONSTANTS } from "@/constants";
import Objective from "@/components/map/Objective.vue";

const props = defineProps<{
  mapId: MapId,
  dimensions: DimensionsDto,
  layers: LayerDto[]
  objective: ObjectiveDto
  selectedLayer: number
}>()

const { isDragging, position, startDrag, endDrag, moveMouse } = useDraggable({ dimensions: props.dimensions })
const extraLayers = computed(() => props.layers.slice(1))

</script>

<template>
  <div class="w-full h-screen flex flex-row bg-no-repeat bg-black"
       :class="{ 'cursor-move': isDragging }"
       :style="{
          'background-position': `left ${-position.x}px top ${-position.y}px`,
          'background-image': `url('${CONSTANTS.BASE_URL}/assets/maps/${mapId}/${props.layers[0].id}')`,
        }"
       @mousedown="startDrag"
       @mouseup="endDrag"
       @mouseleave="endDrag"
       @mousemove="moveMouse"
  >
    <MapLayer v-for="layer of extraLayers" :layerId="layer.id" :offset="layer.offset" :position="position"
              :selectedLayer="selectedLayer" :mapId="mapId"/>
    <Objective :objective="objective" :selected-layer="selectedLayer" :map-position="position"/>
  </div>
</template>