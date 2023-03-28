<script setup lang="ts">
import AttackerPicker from "@/components/operators/AttackerPicker.vue"
import Map from "@/components/map/Map.vue";</script>

<template>
  <Map :map-id="'bank'" :dimensions="{ width:2560, height: 1440 }"/>
  <AttackerPicker class="fixed top-4 left-4"/>
</template>