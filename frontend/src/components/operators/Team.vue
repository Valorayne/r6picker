<script setup lang="ts">
import type { OperatorDto } from "shared/operators";
import OperatorIcon from "@/components/operators/OperatorIcon.vue"

defineProps<{
  operators: OperatorDto[]
}>()
</script>

<template>
  <div class="flex flex-row">
    <OperatorIcon
        v-for="operator in operators"
        :attributes="operator.svg.attributes"
        :contents="operator.svg.contents"
        :size="60"
    />
  </div>
</template>