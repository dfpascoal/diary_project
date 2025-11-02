<script setup lang="ts">
import { RouterView } from 'vue-router'
import DynamicDialog from 'primevue/dynamicdialog'
</script>

<template>
  <RouterView />
  <DynamicDialog />
</template>

<style>
:deep(.p-dialog-content) {
  background: white !important;
}

.dark :deep(.p-dialog-content) {
  background: #16181c !important;
}

:deep(.p-dialog-header) {
  background: white !important;
  border-bottom: 1px solid #e5e7eb;
}

.dark :deep(.p-dialog-header) {
  background: #16181c !important;
  border-bottom: 1px solid #2f3336;
}

:deep(.p-dialog-mask) {
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
}
</style>