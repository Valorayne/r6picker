<script setup lang="ts">
import OperatorIcon from "@/OperatorIcon.vue";
import { useOperators } from "@/data/operators";
import type { OperatorId } from "../../shared/operators";

const { data: attackers } = useOperators("attackers")

const attackerClicked = (id: OperatorId) => {
  console.log(id)
}

</script>

<template>
  <div class="w-full h-screen bg-gradient-to-br from-rainbow-low to-rainbow-high flex flex-row">
    <div>
      <div class="grid gap-1 grid-cols-7">
        <OperatorIcon
            v-for="attacker in attackers"
            :attributes="attacker.svg.attributes"
            :contents="attacker.svg.contents"
            :size="100"
            @click="() => attackerClicked(attacker.id)"
        />
      </div>
    </div>
    <div>
      Hello
    </div>
  </div>
</template>