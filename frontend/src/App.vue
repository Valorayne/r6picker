<script setup lang="ts">
import { useQuery } from "vue-query";
import { computed } from "vue";
import OperatorIcon, { OperatorIconProps } from "@/OperatorIcon.vue";

type OperatorOverviewEntry = {
  id: string,
  name: string,
  svg: OperatorIconProps
}

const query = useQuery<OperatorOverviewEntry[]>(["attackers"], () =>
    fetch("http://localhost:3000/operators/attackers").then(response => response.json()))
const attackers = computed<OperatorOverviewEntry[]>(() => query.data?.value ?? [])

</script>

<template>
  <OperatorIcon v-for="attacker in attackers" v-bind="attacker.svg"/>
</template>