<script setup lang="ts">
import type { MapId } from "shared/maps";
import { useDraggable } from "@/utility/useDraggable";

const props = defineProps<{
  mapId: MapId
  width: number
  height: number
}>()

const { position, startDrag, endDrag, moveMouse, isDragging } = useDraggable({
  width: props.width,
  height: props.height
})
</script>

<template>
  <div class="w-full h-screen flex flex-row bg-bank-0 bg-no-repeat bg-black"
       :class="{ 'cursor-move': isDragging }"
       :style="`background-position: left ${-position.x}px top ${-position.y}px`"
       @mousedown="startDrag"
       @mouseup="endDrag"
       @mouseleave="endDrag"
       @mousemove="moveMouse"
  >
    <slot/>
  </div>
</template>