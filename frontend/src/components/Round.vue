<script setup lang="ts">
import { useNewRoundQuery } from "@/queries/rounds";
import { computed, ref } from "vue";
import type { AttackerId } from "shared/operators";
import AttackerPicker from "@/components/operators/AttackerPicker.vue"
import Map from "@/components/map/Map.vue";
import TeamOverview from "@/components/operators/TeamOverview.vue";

const { data: round } = await useNewRoundQuery()

const selectedAttacker = ref<AttackerId | undefined>()
const attackerSelected = (id: AttackerId) => selectedAttacker.value = id

const attackers = computed(() =>
    selectedAttacker.value && round.value
        ? round.value.teamMates.concat([selectedAttacker.value])
        : round.value?.teamMates ?? []
)

</script>

<template>
  <div v-if="round">
    <Map
        :map-id="round.map"
        :dimensions="{ width:2560, height: 1440 }"/>
    <AttackerPicker
        class="fixed top-4 left-4"
        :selected-attacker="selectedAttacker"
        :team-mates="round.teamMates"
        @attackerSelected="attackerSelected"/>
    <TeamOverview
        class="fixed top-4 right-4"
        :attackers="attackers"
        :defenders="round.defenders"/>
  </div>
</template>