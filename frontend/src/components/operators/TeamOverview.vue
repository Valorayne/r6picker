<script setup lang="ts">

import Overlay from "@/components/utility/Overlay.vue";
import type { AttackerId, DefenderId, OperatorDto, OperatorId } from "shared/types/operators";
import { useOperatorsQuery } from "@/queries/operators";
import { computed } from "vue";
import Team from "@/components/operators/Team.vue";

const props = defineProps<{
  attackers: AttackerId[],
  defenders: DefenderId[]
}>()

const { data: allDefenderIcons } = useOperatorsQuery("defenders")
const { data: allAttackerIcons } = useOperatorsQuery("attackers")

const pickOperatorIcons = (ids: OperatorId[], dtos?: OperatorDto[]) => dtos?.length ? ids.map(id => dtos.find(a => a.id === id)) : []
const attackerIcons = computed(() => pickOperatorIcons(props.attackers, allAttackerIcons.value))
const defenderIcons = computed(() => pickOperatorIcons(props.defenders, allDefenderIcons.value))
</script>

<template>
  <Overlay v-if="allAttackerIcons?.length && allDefenderIcons?.length">
    <div class="flex flex-row">
      <Team :operators="attackerIcons"/>
      <div class="flex h-50 mx-5 items-center">
        <span class="text-3xl text-white">VS</span>
      </div>
      <Team :operators="defenderIcons"/>
    </div>
  </Overlay>
</template>