<script setup lang="ts">
import type { OperatorDto } from "shared/types/operators";
import OperatorIcon from "@/components/operators/OperatorIcon.vue"
import { times } from "lodash-es";
import { computed } from "vue";

const props = defineProps<{
  operators: (OperatorDto | Record<string, unknown>)[]
}>()
const fullTeam = computed(() => props.operators.concat(times(5 - props.operators.length, () => ({}))))
</script>

<template>
  <div class="flex flex-row">
    <OperatorIcon
        v-for="operator of fullTeam"
        :attributes="operator?.svg?.attributes"
        :contents="operator?.svg?.contents"
        :size="60"
    />
  </div>
</template>