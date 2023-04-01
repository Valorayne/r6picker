<script setup lang="ts">
import type { MapId } from "shared/maps";
import { computed, ref, watch } from "vue";
import MapRenderer from "@/components/map/MapRenderer.vue";
import MapLayerSelector from "@/components/map/MapLayerSelector.vue";
import QueryLoader from "@/components/utility/QueryLoader.vue"
import { useMapQuery } from "@/queries/maps";
import type { ObjectiveDto } from "shared/objectives";

const props = defineProps<{
  mapId: MapId
  objectiveId: string
}>()
const mapQuery = useMapQuery(computed(() => props.mapId))

const selectedLayer = ref(2)
const layerClicked = (layerId: number) => selectedLayer.value = layerId
watch(() => mapQuery.data?.value?.layers, (layers) => selectedLayer.value = layers?.[0]?.id ?? 0, { immediate: true })

const objective = computed(() => mapQuery.data.value?.objectives?.find((o: ObjectiveDto) => o.id === props.objectiveId))

</script>

<template>
  <QueryLoader :query="mapQuery" v-slot="map">
    <MapRenderer
        v-if="objectiveId"
        :map-id="mapId"
        :layers="map.layers"
        :objective="objective"
        :selected-layer="selectedLayer"
        :dimensions="map.dimensions"/>
    <MapLayerSelector
        :selected-layer="selectedLayer"
        @selectLayer="layerClicked"
        :layers="map.layers"
        class="fixed right-4 bottom-4"/>
  </QueryLoader>
</template>