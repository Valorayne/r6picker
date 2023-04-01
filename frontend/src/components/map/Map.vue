<script setup lang="ts">
import type { MapId } from "shared/maps";
import { computed, ref, watch } from "vue";
import MapRenderer from "@/components/map/MapRenderer.vue";
import MapLayerSelector from "@/components/map/MapLayerSelector.vue";
import QueryLoader from "@/components/utility/QueryLoader.vue"
import { useMapQuery } from "@/queries/maps";

const props = defineProps<{ mapId: MapId }>()
const mapQuery = useMapQuery(computed(() => props.mapId))

const selectedLayer = ref(0)
const layerClicked = (layerId: number) => selectedLayer.value = layerId
watch(() => mapQuery.data?.value?.layers, (layers) => selectedLayer.value = layers?.[0]?.id ?? 0, { deep: true })

</script>

<template>
  <QueryLoader :query="mapQuery" v-slot="map">
    <MapRenderer
        :map-id="mapId"
        :layers="map.layers"
        :selected-layer="selectedLayer"
        :dimensions="map.dimensions"/>
    <MapLayerSelector
        :selected-layer="selectedLayer"
        @selectLayer="layerClicked"
        :layers="map.layers"
        class="fixed right-4 bottom-4"/>
  </QueryLoader>
</template>