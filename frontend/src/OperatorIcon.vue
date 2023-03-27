<script setup lang="ts">

withDefaults(defineProps<{
  attributes: Record<string, unknown>
  contents: string
  size?: number
  selected?: boolean
}>(), {
  size: 50,
  selected: false
})
defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <div :class="selected ? 'bg-selected-operator' : ''">
    <svg v-bind="attributes"
         v-html="contents"
         :width="size"
         :height="size"
         class="hover:cursor-pointer"
         @click="() => $emit('click')"
    />
  </div>
</template>