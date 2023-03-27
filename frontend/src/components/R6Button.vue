<script setup lang="ts">
defineProps<{ selected?: boolean }>()
</script>

<template>
  <div
      class=" py-1 px-3 text-center rounded  transition-all duration-150"
      :class="{
        'bg-selected-operator': selected,
        'bg-slate-200 hover:bg-slate-400 hover:cursor-pointer': !selected
      }"
  >
    <b>
      <slot/>
    </b>
  </div>
</template>