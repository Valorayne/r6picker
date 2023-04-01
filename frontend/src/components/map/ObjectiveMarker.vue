<script setup lang="ts">
import type { Position } from "shared/types";

defineProps<{
  label: string
  position: Position
  mapPosition: Position
}>()

</script>
<template>
  <div
      class="fixed h-10 w-10 rounded text-center align-text-middle text-2xl font-bold border-2 text-white"
      :style="{
        left: `${position.x-mapPosition.x}px`,
        top: `${position.y-mapPosition.y}px`
      }"
  >
    {{ label }}
  </div>
</template>