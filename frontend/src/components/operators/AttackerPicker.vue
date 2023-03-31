<script setup lang="ts">
import OperatorIcon from "@/components/operators/OperatorIcon.vue"
import type { AttackerId } from "shared/operators";
import Overlay from "@/components/utility/Overlay.vue";
import R6Button from "@/components/utility/R6Button.vue";
import { useOperatorsQuery } from "@/queries/operators";

defineProps<{
  selectedAttacker: AttackerId | undefined
  teamMates: AttackerId[]
}>()

defineEmits<{
  (e: 'attackerSelected', id: AttackerId): void
  (e: 'selectionConfirmed'): void
}>()

const { data: attackers } = useOperatorsQuery("attackers")
</script>

<template>
  <div>
    <Overlay v-if="attackers?.length">
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
    <div class="flex justify-center mt-2 transition-opacity duration-150"
         :class="selectedAttacker ? 'opacity-100' : 'opacity-0'">
      <Overlay>
        <R6Button @click="() => $emit('selectionConfirmed')">Confirm</R6Button>
      </Overlay>
    </div>
  </div>
</template>