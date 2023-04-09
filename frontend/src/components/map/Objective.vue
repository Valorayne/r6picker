<script setup lang="ts">
import type { ObjectiveDto } from "shared/types/objectives";
import ObjectiveMarker from "@/components/map/ObjectiveMarker.vue";
import type { PositionDto } from "shared/types/types";

defineProps<{
  objectiveLayerId: number
  objective: ObjectiveDto
  selectedLayer: number
  mapPosition: PositionDto
}>()

</script>
<template>
  <div v-if="objective.type === 'bomb'">
    <ObjectiveMarker
        v-if="selectedLayer === objectiveLayerId"
        class="bg-orange-600"
        :position="objective.a"
        :map-position="mapPosition"
        label="A"/>
    <ObjectiveMarker
        v-if="selectedLayer === objectiveLayerId"
        class="bg-orange-600"
        :position="objective.b"
        :map-position="mapPosition"
        label="B"/>
  </div>
  <div v-else>
    <ObjectiveMarker
        v-if="selectedLayer === objectiveLayerId"
        :position="objective.position"
        :map-position="mapPosition"
        :label="objective.type === 'hostage' ? 'H' : 'S'"/>
  </div>
</template>