<script setup lang="ts">

withDefaults(defineProps<{
  attributes?: Record<string, unknown>
  contents?: string
  size?: number
  selectable?: boolean
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
    'bg-selected-operator rounded': selected,
    'opacity-30': disabled,
    'hover:scale-110 hover:cursor-pointer': !disabled && !selected && selectable,
  }" class="transition-all duration-150">
    <svg v-if="contents"
         v-bind="attributes"
         v-html="contents"
         :width="size"
         :height="size"
         @click="() => !disabled && $emit('click')"
    />
    <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 350" :width="size" :height="size">
      <switch>
        <g>
          <path d="M45 45h260v260H45z" style="opacity:.4"></path>
          <path d="M73 73h204v204H73z" style="fill:#647684"></path>
          <text x="130" y="245" font-size="200" fill="white">?</text>
        </g>
      </switch>
    </svg>
  </div>
</template>