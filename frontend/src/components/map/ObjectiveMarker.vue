<script setup lang="ts">
import type { PositionDto } from "shared/types/types";

defineProps<{
  label: string
  position: PositionDto
  mapPosition: PositionDto
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