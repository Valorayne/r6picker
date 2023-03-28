<script setup lang="ts">
import AttackerPicker from "@/components/AttackerPicker.vue"
import Map from "@/components/Map.vue";</script>

<template>
  <Map :map-id="'bank'" :width="2560" :height="1440"/>
  <AttackerPicker class="fixed top-4 left-4"/>
</template>