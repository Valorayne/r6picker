<script setup lang="ts">

import { watch } from "vue";

const props = defineProps<{
  value: unknown
  immediate?: boolean
}>()

watch(() => props.value, console.log, { immediate: props.immediate ?? false })
</script>
<template>

</template>