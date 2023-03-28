<script setup lang="ts">
import type { MapId } from "shared/maps";
import { ref } from "vue";
import Overlay from "@/components/Overlay.vue";
import R6Button from "@/components/R6Button.vue";
import MapRenderer from "@/components/map/MapRenderer.vue";
import type { Dimensions } from "@/utility/types";

defineProps<{
  mapId: MapId
  dimensions: Dimensions
}>()

// TODO get from backend
const layers = {
  0: "Basement",
  1: "1st Floor",
  2: "2nd Floor",
  3: "Roof"
}
const offset = {
  x: 674,
  y: 178
}

const selectedLayer = ref(0)
const layerClicked = (layerId: number) => selectedLayer.value = layerId
</script>

<template>
  <MapRenderer
      :map-id="mapId"
      :layers="layers"
      :selected-layer="selectedLayer"
      :dimensions="dimensions"
      :offset="offset"/>
  <Overlay class="fixed right-4 bottom-4 flex flex-col space-y-2">
    <R6Button
        :selected="selectedLayer === +layerId"
        v-for="layerId in Object.keys(layers)"
        @click="() => layerClicked(+layerId)"
    >
      {{ layers[layerId] }}
    </R6Button>
  </Overlay>
</template>