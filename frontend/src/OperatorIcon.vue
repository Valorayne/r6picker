<script setup lang="ts">

export type OperatorIconProps = {
  attributes: Record<string, unknown>
  contents: string
  size?: number
  selected?: boolean
}
withDefaults(defineProps<OperatorIconProps>(), { size: 50, selected: false })
</script>

<template>
  <svg v-bind="attributes" v-html="contents" :width="size" :height="size"
       class="hover:cursor-pointer"/>
</template>