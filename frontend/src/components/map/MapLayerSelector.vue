<script setup lang="ts">
import Overlay from "@/components/utility/Overlay.vue";
import R6Button from "@/components/utility/R6Button.vue";
import type { Layers } from "shared/maps";

defineProps<{
  selectedLayer: number
  layers: Layers
}>()
defineEmits<{ (e: 'selectLayer', layerId: number): void }>()
</script>

<template>
  <Overlay class="flex flex-col space-y-2">
    <R6Button
        :selected="selectedLayer === +layerId"
        v-for="layerId in Object.keys(layers)"
        @click="() => $emit('selectLayer',+layerId)"
    >
      {{ layers[layerId] }}
    </R6Button>
  </Overlay>
</template>