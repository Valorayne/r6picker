<script setup lang="ts">
import type { OperatorDto } from "shared/operators";

export type OperatorIconProps = OperatorDto["svg"] & { size?: number }
withDefaults(defineProps<OperatorIconProps>(), { size: 50 })
</script>

<template>
  <svg v-bind="attributes" v-html="contents" :width="size" :height="size"/>
</template>