<script setup lang="ts">
import OperatorIcon from "@/components/OperatorIcon.vue"
import { useOperatorsQuery } from "@/queries/operators";
import { AttackerId, OperatorId } from "../../../shared/operators";
import { ref } from "vue";
import Overlay from "@/components/Overlay.vue";

const { data: attackers } = useOperatorsQuery("attackers")

const selectedAttacker = ref<OperatorId | undefined>()
const attackerClicked = (id: OperatorId) => selectedAttacker.value = id

const selectedByOthers: AttackerId[] = ['ash', 'gridlock', 'kali', 'blitz']

</script>

<template>
  <Overlay v-if="attackers.length">
    <div class="grid gap-1 grid-cols-7">
      <OperatorIcon
          v-for="attacker in attackers"
          :attributes="attacker.svg.attributes"
          :contents="attacker.svg.contents"
          :size="80"
          :selected="selectedAttacker === attacker.id"
          :disabled="selectedByOthers.includes(attacker.id)"
          @click="() => attackerClicked(attacker.id)"
      />
    </div>
  </Overlay>
</template>