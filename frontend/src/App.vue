<script setup lang="ts">
import Round from "@/components/rounds/Round.vue";
import { storeRoundResult, useNewRoundQuery } from "@/queries/rounds";
import type { AttackerId } from "shared/operators";
import type { RoundDto } from "../../shared/rounds";

const { data: round, refetch } = useNewRoundQuery()
const confirmSelection = (selected: AttackerId) => {
  storeRoundResult({
    ...(round.value as RoundDto),
    selected
  }).then(() => refetch.value())
}
</script>

<template>
  <Round v-if="round" :round="round" @selectionConfirmed="confirmSelection"/>
</template>