<script setup lang="ts">
import type { MapId } from "shared/maps";
import { computed, ref, watch } from "vue";
import MapRenderer from "@/components/map/MapRenderer.vue";
import MapLayerSelector from "@/components/map/MapLayerSelector.vue";
import { useMapQuery } from "@/queries/maps";

const props = defineProps<{ mapId: MapId }>()
const { data } = await useMapQuery(computed(() => props.mapId))

const selectedLayer = ref(0)
const layerClicked = (layerId: number) => selectedLayer.value = layerId
watch(() => data?.value?.layers, (layers) => selectedLayer.value = layers?.[0]?.id ?? 0, { deep: true })

</script>

<template>
  <div v-if="data">
    <MapRenderer
        :map-id="mapId"
        :layers="data.layers"
        :selected-layer="selectedLayer"
        :dimensions="data.dimensions"/>
    <MapLayerSelector
        :selected-layer="selectedLayer"
        @selectLayer="layerClicked"
        :layers="data.layers"
        class="fixed right-4 bottom-4"/>
  </div>
</template>