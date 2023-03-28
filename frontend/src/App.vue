<script setup lang="ts">
import Round from "@/components/Round.vue";
import { useNewRoundQuery } from "@/queries/rounds";

const { data: round } = useNewRoundQuery()

</script>

<template>
  <Round v-if="round" :round="round"/>
</template>