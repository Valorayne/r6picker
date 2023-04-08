<script setup lang="ts">
import { computed, ref } from "vue";
import type { AttackerId } from "shared/types/operators";
import AttackerPicker from "@/components/operators/AttackerPicker.vue"
import Map from "@/components/map/Map.vue";
import TeamOverview from "@/components/operators/TeamOverview.vue";
import type { RoundDto } from "shared/types/rounds";

const emit = defineEmits<{ (e: 'selectionConfirmed', attacker: AttackerId): void }>()

const props = defineProps<{ round: RoundDto }>()

const selectedAttacker = ref<AttackerId | undefined>()
const attackerSelected = (id: AttackerId) => selectedAttacker.value = id

const attackers = computed(() =>
    selectedAttacker.value && props.round
        ? props.round.teamMates.concat([selectedAttacker.value!])
        : props.round?.teamMates ?? []
)
const selectionConfirmed = () => {
  if (!selectedAttacker.value) return
  emit('selectionConfirmed', selectedAttacker.value!)
  selectedAttacker.value = undefined
}
</script>

<template>
  <Map :map-id="round.map" :objective="round.objective"/>
  <AttackerPicker
      class="fixed top-4 left-4"
      :selected-attacker="selectedAttacker"
      :team-mates="round.teamMates"
      @attackerSelected="attackerSelected"
      @selectionConfirmed="selectionConfirmed"/>
  <TeamOverview
      class="fixed top-4 right-4"
      :attackers="attackers"
      :defenders="round.defenders"/>
</template>