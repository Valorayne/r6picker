<script setup lang="ts">
import AttackerPicker from "@/components/operators/AttackerPicker.vue"
import Map from "@/components/map/Map.vue";
import TeamOverview from "@/components/operators/TeamOverview.vue";
import { computed, ref } from "vue";
import type { AttackerId, DefenderId } from "shared/operators";

const selectedAttacker = ref<AttackerId | undefined>()
const attackerSelected = (id: AttackerId) => selectedAttacker.value = id

const teamMembers: AttackerId[] = ['ash', 'gridlock', 'kali', 'blitz']

const attackers = computed(() => selectedAttacker.value ? teamMembers.concat([selectedAttacker.value]) : teamMembers)
const defenders: DefenderId[] = ['doc', 'solis', 'caveira']

</script>

<template>
  <Map
      :map-id="'bank'"
      :dimensions="{ width:2560, height: 1440 }"/>
  <AttackerPicker
      class="fixed top-4 left-4"
      :selected-attacker="selectedAttacker"
      :team-members="teamMembers"
      @attackerSelected="attackerSelected"/>
  <TeamOverview
      class="fixed top-4 right-4"
      :attackers="attackers"
      :defenders="defenders"/>
</template>