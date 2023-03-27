<script setup lang="ts">

withDefaults(defineProps<{
  attributes: Record<string, unknown>
  contents: string
  size?: number
  selected?: boolean
  disabled?: boolean
}>(), {
  size: 50,
  selected: false,
  disabled: false
})
defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <div :class="{
    'bg-selected-operator': selected,
    'opacity-30': disabled
  }">
    <svg v-bind="attributes"
         v-html="contents"
         :width="size"
         :height="size"
         class="hover:cursor-pointer"
         @click="() => !disabled && $emit('click')"
    />
  </div>
</template>