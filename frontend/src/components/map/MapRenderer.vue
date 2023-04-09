<script setup lang="ts">
import { useDraggable } from "@/utility/useDraggable";
import type { LayerDto, MapId } from "shared/types/maps";
import MapLayer from "@/components/map/MapLayer.vue";
import type { DimensionsDto } from "shared/types/types";
import { computed } from "vue";
import { CONSTANTS } from "@/constants";
import Objective from "@/components/map/Objective.vue";

const props = defineProps<{
  mapId: MapId,
  dimensions: DimensionsDto,
  layers: LayerDto[]
  objectiveLayerId: number
  objectiveId: number
  selectedLayer: number
}>()

const { isDragging, position, startDrag, endDrag, moveMouse } = useDraggable({ dimensions: props.dimensions })
const extraLayers = computed(() => props.layers.slice(1))

const objective = computed(() => props.layers.find(
    (layer) => layer.id === props.objectiveLayerId)!.objectives.find(
    (objective) => objective.id === props.objectiveId)!
)

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
    <Objective :objective="objective" v-if="selectedLayer === objectiveLayerId" :map-position="position"/>
  </div>
</template>