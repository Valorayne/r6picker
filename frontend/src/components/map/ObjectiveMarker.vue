<script setup lang="ts">
import type { PositionDto } from "shared/types/types";

defineProps<{
  label: string
  offset?: PositionDto
  position: PositionDto
  mapPosition: PositionDto
}>()

</script>
<template>
  <div
      class="fixed h-10 w-10 rounded text-center align-text-middle text-2xl font-bold border-2 text-white"
      :style="{
        left: `${position.x + (offset?.x ?? 0) - mapPosition.x}px`,
        top: `${position.y + (offset?.y ?? 0) - mapPosition.y}px`
      }"
  >
    {{ label }}
  </div>
</template>