<script setup lang="ts">
import { computed, ref } from "vue";
import type { MapId } from "shared/maps";
import { clamp } from "@/utility/numbers";
import { useWindowSize } from "@/utility/windowSize";

const props = withDefaults(defineProps<{
  mapId: MapId
  width: number
  height: number
  maxVerticalOffset?: number
  maxHorizontalOffset?: number
}>(), {
  maxVerticalOffset: 300,
  maxHorizontalOffset: 500
})

type Position = { x: number; y: number }

const mapPosition = ref<Position>({ x: 0, y: 0 })
const isDragging = ref(false)
const windowSize = useWindowSize()

const startDrag = () => isDragging.value = true
const endDrag = () => isDragging.value = false

const limits = computed(() => ({
  minX: -props.maxHorizontalOffset,
  maxX: props.width + props.maxHorizontalOffset - windowSize.value.x,
  minY: -props.maxVerticalOffset,
  maxY: props.height + props.maxVerticalOffset - windowSize.value.y
}))

const moveMouse = (e) => {
  if (!isDragging.value) return
  mapPosition.value = {
    x: clamp(limits.value.minX, limits.value.maxX, mapPosition.value.x - e.movementX),
    y: clamp(limits.value.minY, limits.value.maxY, mapPosition.value.y - e.movementY)
  }
}
</script>

<template>
  <div class="w-full h-screen flex flex-row bg-bank-0 bg-no-repeat bg-black hover:cursor-move"
       :style="`background-position: left ${-mapPosition.x}px top ${-mapPosition.y}px`"
       @mousedown="startDrag"
       @mouseup="endDrag"
       @mouseleave="endDrag"
       @mousemove="moveMouse"
  >
    <slot/>
  </div>
</template>