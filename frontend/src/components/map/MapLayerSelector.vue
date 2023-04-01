<script setup lang="ts">
import Overlay from "@/components/utility/Overlay.vue";
import R6Button from "@/components/utility/R6Button.vue";
import type { LayerDto } from "shared/maps";
import type { ObjectiveDto } from "shared/objectives";
import { computed } from "vue";
import { findLayersWithObjectives } from "@/queries/operators";

const props = defineProps<{
  selectedLayer: number
  layers: LayerDto[]
  objective: ObjectiveDto
}>()
defineEmits<{ (e: 'selectLayer', layerId: number): void }>()

const layersWithObjectives = computed(() => findLayersWithObjectives(props.objective))
</script>

<template>
  <Overlay class="flex flex-col space-y-2">
    <R6Button
        :selected="selectedLayer === layer.id"
        :highlight="layersWithObjectives.includes(layer.id) && selectedLayer !== layer.id"
        v-for="layer in layers"
        @click="() => $emit('selectLayer',layer.id)"
    >
      {{ layer.name }}
    </R6Button>
  </Overlay>
</template>