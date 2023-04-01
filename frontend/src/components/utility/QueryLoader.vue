<script setup lang="ts">
import type { Query } from "@/utility/types";

defineProps<{
  query: Query<unknown>
}>()

</script>
<template>
  <div v-if="query.data.value">
    <slot v-bind="query.data.value"/>
  </div>
  <div v-else-if="query.isLoading">Loading...</div>
  <div v-else-if="query.isError">{{ query.error.value.message }}</div>
</template>