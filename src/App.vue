<script setup lang="ts">
import { RouterView } from 'vue-router'
import DynamicDialog from 'primevue/dynamicdialog'
import ConfirmDialog from 'primevue/confirmdialog'
import Toast from 'primevue/toast'
</script>

<template>
  <Toast />
  <ConfirmDialog />
  <DynamicDialog />
  <RouterView />
</template>

<style>
:deep(.p-dialog-header) {
  background: var(--p-surface-0) !important;
  border-bottom: 1px solid var(--p-surface-200);
}

:deep(.p-dialog-content) {
  background: var(--p-surface-0) !important;
}

:deep(.p-dialog-mask) {
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
}
</style>
