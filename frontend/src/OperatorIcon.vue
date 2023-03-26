<script setup lang="ts">
export type OperatorIconProps = {
  contents: string
  attributes: Record<string, string>
  size?: number
}
withDefaults(defineProps<OperatorIconProps>(), { size: 50 })
</script>

<template>
  <svg v-bind="attributes" v-html="contents" :width="size" :height="size"/>
</template>