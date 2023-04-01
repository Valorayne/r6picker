<script setup lang="ts">
defineProps<{ selected?: boolean, highlight?: boolean }>()
</script>

<template>
  <div
      class=" py-1 px-5 text-center rounded transition-all duration-150"
      :class="{
        'bg-selected-operator': selected,
        'hover:bg-slate-400 hover:cursor-pointer': !selected,
        'bg-slate-200': !selected && !highlight,
        'bg-orange-200': !selected && highlight,
      }"
  >
    <b>
      <slot/>
    </b>
  </div>
</template>