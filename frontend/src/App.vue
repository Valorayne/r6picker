<script setup lang="ts">
import AttackerPicker from "@/components/AttackerPicker.vue"
import DraggableMap from "@/components/DraggableMap.vue";</script>

<template>
  <DraggableMap :map-id="'bank-0'" :width="2560" :height="1440"/>
  <AttackerPicker class="fixed top-4 left-4"/>
</template>