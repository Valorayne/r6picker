<script setup lang="ts">
import OperatorIcon from "@/OperatorIcon.vue"
import { useOperators } from "@/data/operators";
import { OperatorId } from "../../shared/operators";
import { ref } from "vue";

const { data: attackers } = useOperators("attackers")

const selectedAttacker = ref<OperatorId | undefined>()
const attackerClicked = (id: OperatorId) => selectedAttacker.value = id

</script>

<template>
  <div class="grid gap-1 grid-cols-7">
    <OperatorIcon
        v-for="attacker in attackers"
        :attributes="attacker.svg.attributes"
        :contents="attacker.svg.contents"
        :size="100"
        :selected="selectedAttacker === attacker.id"
        @click="() => attackerClicked(attacker.id)"
    />
  </div>
</template>