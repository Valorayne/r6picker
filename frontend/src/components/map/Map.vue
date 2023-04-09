<script setup lang="ts">
import type { MapId } from "shared/types/maps";
import { computed, ref, watch } from "vue";
import MapRenderer from "@/components/map/MapRenderer.vue";
import MapLayerSelector from "@/components/map/MapLayerSelector.vue";
import QueryLoader from "@/components/utility/QueryLoader.vue"
import { useMapQuery } from "@/queries/maps";

const props = defineProps<{
  mapId: MapId
  layerId: number
  objectiveId: number
}>()
const mapQuery = useMapQuery(computed(() => props.mapId))

const selectedLayer = ref(0)
const layerClicked = (layerId: number) => selectedLayer.value = layerId

// make sure each new round starts with the objective layer selected
watch(() => props.layerId, (layerId) => selectedLayer.value = layerId, { immediate: true })

</script>

<template>
  <QueryLoader :query="mapQuery" v-slot="map">
    <MapRenderer
        :map-id="mapId"
        :layers="map.layers"
        :objective-layer-id="layerId"
        :objective-id="objectiveId"
        :selected-layer="selectedLayer"
        :dimensions="map.dimensions"/>
    <MapLayerSelector
        :selected-layer="selectedLayer"
        @selectLayer="layerClicked"
        :layers="map.layers"
        :objective-layer-id="layerId"
        class="fixed right-4 bottom-4"/>
  </QueryLoader>
</template>