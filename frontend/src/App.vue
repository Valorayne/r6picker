<script setup lang="ts">
import Round from "@/components/rounds/Round.vue";
import { useNewRoundQuery, useStoreRoundResultMutation } from "@/queries/rounds";
import type { AttackerId } from "shared/types/operators";

const { data: round, refetch } = useNewRoundQuery()
const { mutateAsync: storeRoundResult } = useStoreRoundResultMutation()

const confirmSelection = (selected: AttackerId) => {
  storeRoundResult({ ...round.value!, selected }).then(() => refetch.value())
}
</script>

<template>
  <Round v-if="round" :round="round" @selectionConfirmed="confirmSelection"/>
</template>