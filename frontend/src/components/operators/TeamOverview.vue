<script setup lang="ts">

import Overlay from "@/components/utility/Overlay.vue";
import type { AttackerId, DefenderId, OperatorDto, OperatorId } from "shared/operators";
import { useOperatorsQuery } from "@/queries/operators";
import { computed } from "vue";
import Team from "@/components/operators/Team.vue";

const props = defineProps<{
  attackers: AttackerId[],
  defenders: DefenderId[]
}>()

const { data: allDefenderIcons } = useOperatorsQuery("defenders")
const { data: allAttackerIcons } = useOperatorsQuery("attackers")

const findOperators = (ids: OperatorId[], dtos?: OperatorDto[]) => dtos?.length ? ids.map(id => dtos.find(a => a.id === id)) : []
const attackerIcons = computed(() => findOperators(props.attackers, allAttackerIcons.value))
const defenderIcons = computed(() => findOperators(props.defenders, allDefenderIcons.value))
</script>

<template>
  <Overlay>
    <div class="flex flex-row">
      <Team :operators="attackerIcons"/>
      <div class="flex h-50 mx-5 items-center">
        <span class="text-3xl text-white">VS</span>
      </div>
      <Team :operators="defenderIcons"/>
    </div>
  </Overlay>
</template>