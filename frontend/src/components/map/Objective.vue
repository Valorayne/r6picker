<script setup lang="ts">
import type { ObjectiveDto } from "shared/types/objectives";
import ObjectiveMarker from "@/components/map/ObjectiveMarker.vue";
import type { PositionDto } from "shared/types/types";

defineProps<{
  offset?: PositionDto
  objective: ObjectiveDto
  mapPosition: PositionDto
}>()

</script>
<template>
  <div v-if="objective.type === 'bomb'">
    <ObjectiveMarker
        class="bg-orange-600"
        :offset="offset"
        :position="objective.a"
        :map-position="mapPosition"
        label="A"/>
    <ObjectiveMarker
        class="bg-orange-600"
        :offset="offset"
        :position="objective.b"
        :map-position="mapPosition"
        label="B"/>
  </div>
  <div v-else>
    <ObjectiveMarker
        :offset="offset"
        :position="objective.position"
        :map-position="mapPosition"
        :label="objective.type === 'hostage' ? 'H' : 'S'"/>
  </div>
</template>