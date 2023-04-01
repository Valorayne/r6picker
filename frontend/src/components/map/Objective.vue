<script setup lang="ts">
import type { ObjectiveDto } from "shared/objectives";
import ObjectiveMarker from "@/components/map/ObjectiveMarker.vue";
import type { Position } from "shared/types";

defineProps<{
  objective: ObjectiveDto
  selectedLayer: number
  mapPosition: Position
}>()

</script>
<template>
  <div v-if="objective.type === 'bomb'">
    <ObjectiveMarker
        v-if="selectedLayer === objective.a.layer"
        class="bg-orange-600"
        :position="objective.a.position"
        :map-position="mapPosition"
        label="A"/>
    <ObjectiveMarker
        v-if="selectedLayer === objective.b.layer"
        class="bg-orange-600"
        :position="objective.b.position"
        :map-position="mapPosition"
        label="B"/>
  </div>
  <div v-else>
    <ObjectiveMarker
        v-if="selectedLayer === objective.location.layer"
        :position="objective.location.position"
        :map-position="mapPosition"
        :label="objective.type === 'hostage' ? 'H' : 'S'"/>
  </div>
</template>