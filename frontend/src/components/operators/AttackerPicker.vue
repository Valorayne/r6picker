<script setup lang="ts">
import OperatorIcon from "@/components/operators/OperatorIcon.vue"
import { useOperatorsQuery } from "@/queries/operators";
import type { AttackerId } from "shared/operators";
import Overlay from "@/components/utility/Overlay.vue";

defineProps<{
  selectedAttacker: AttackerId | undefined
  teamMates: AttackerId[]
}>()

defineEmits<{
  (e: 'attackerSelected', id: AttackerId): void
}>()

const { data: attackers } = useOperatorsQuery("attackers")
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
          :disabled="teamMates.includes(attacker.id)"
          selectable
          @click="() => $emit('attackerSelected', attacker.id)"
      />
    </div>
  </Overlay>
</template>