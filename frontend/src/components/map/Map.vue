<script setup lang="ts">
import type { MapId } from "shared/maps";
import { ref } from "vue";
import MapRenderer from "@/components/map/MapRenderer.vue";
import MapLayerSelector from "@/components/map/MapLayerSelector.vue";

defineProps<{
  mapId: MapId
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
const dimensions = {
  width: 2560,
  height: 1440
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
  <MapLayerSelector
      :selected-layer="selectedLayer"
      @selectLayer="layerClicked"
      :layers="layers"
      class="fixed right-4 bottom-4"/>
</template>