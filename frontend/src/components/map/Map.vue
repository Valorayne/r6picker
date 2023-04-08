<script setup lang="ts">
import type { MapId } from "shared/types/maps";
import { computed, ref, watch } from "vue";
import MapRenderer from "@/components/map/MapRenderer.vue";
import MapLayerSelector from "@/components/map/MapLayerSelector.vue";
import QueryLoader from "@/components/utility/QueryLoader.vue"
import { useMapQuery } from "@/queries/maps";
import type { ObjectiveDto } from "shared/types/objectives";
import { findLayersWithObjectives } from "@/queries/operators";

const props = defineProps<{
  mapId: MapId
  objective: ObjectiveDto
}>()
const mapQuery = useMapQuery(computed(() => props.mapId))

const selectedLayer = ref(2)
const layerClicked = (layerId: number) => selectedLayer.value = layerId

const layersWithObjectives = computed(() => findLayersWithObjectives(props.objective))
watch(layersWithObjectives, (layers) => selectedLayer.value = layers[0], { immediate: true })

</script>

<template>
  <QueryLoader :query="mapQuery" v-slot="map">
    <MapRenderer
        :map-id="mapId"
        :layers="map.layers"
        :objective="objective"
        :selected-layer="selectedLayer"
        :dimensions="map.dimensions"/>
    <MapLayerSelector
        :selected-layer="selectedLayer"
        @selectLayer="layerClicked"
        :layers="map.layers"
        :objective="objective"
        class="fixed right-4 bottom-4"/>
  </QueryLoader>
</template>