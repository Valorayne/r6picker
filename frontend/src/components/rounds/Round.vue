<script setup lang="ts">
import { computed, ref } from "vue";
import type { AttackerId } from "shared/operators";
import AttackerPicker from "@/components/operators/AttackerPicker.vue"
import Map from "@/components/map/Map.vue";
import TeamOverview from "@/components/operators/TeamOverview.vue";
import type { RoundDto } from "shared/rounds";

const { round } = defineProps<{ round: RoundDto }>()

const selectedAttacker = ref<AttackerId | undefined>()
const attackerSelected = (id: AttackerId) => selectedAttacker.value = id

const attackers = computed(() =>
    selectedAttacker.value && round
        ? round.teamMates.concat([selectedAttacker.value])
        : round?.teamMates ?? []
)
</script>

<template>
  <Map :map-id="round.map"/>
  <AttackerPicker
      class="fixed top-4 left-4"
      :selected-attacker="selectedAttacker"
      :team-mates="round.teamMates"
      @attackerSelected="attackerSelected"/>
  <TeamOverview
      class="fixed top-4 right-4"
      :attackers="attackers"
      :defenders="round.defenders"/>
</template>