<script setup lang="ts">
import OperatorIcon, { OperatorIconProps } from "@/OperatorIcon.vue";
import { useOperators } from "@/data/operators";

const { data: attackers } = useOperators("attackers")

</script>

<template>
  <OperatorIcon
      v-for="attacker in attackers"
      :attributes="attacker.svg.attributes"
      :contents="attacker.svg.contents"
      :size="100"/>
</template>