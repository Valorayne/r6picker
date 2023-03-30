<script setup lang="ts">
import Overlay from "@/components/utility/Overlay.vue";
import R6Button from "@/components/utility/R6Button.vue";
import type { LayerDto } from "shared/maps";

defineProps<{
  selectedLayer: number
  layers: LayerDto[]
}>()
defineEmits<{ (e: 'selectLayer', layerId: number): void }>()
</script>

<template>
  <Overlay class="flex flex-col space-y-2">
    <R6Button
        :selected="selectedLayer === layer.id"
        v-for="layer in layers"
        @click="() => $emit('selectLayer',layer.id)"
    >
      {{ layer.name }}
    </R6Button>
  </Overlay>
</template>