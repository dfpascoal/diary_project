<template>
  <div class="p-4 space-y-6">
    <h2 class="text-2xl font-semibold">Privacidade</h2>

    <Card>
      <template #header>
        <div class="p-4">
          <h3 class="text-lg font-semibold">Perfil privado</h3>
        </div>
      </template>
      <template #content>
        <div class="flex justify-between items-center">
          <span>Ativar perfil privado</span>
          <ToggleSwitch v-model="isPrivate" />
        </div>
      </template>
    </Card>

    <Card>
      <template #header>
        <div class="p-4">
          <h3 class="text-lg font-semibold">Marcação e menções</h3>
        </div>
      </template>
      <template #content>
        <p class="mb-4">Select quem pode te mencionar ou marcar nas postagens.</p>
        <Select
          v-model="mentions"
          :options="mentionOptions"
          placeholder="Selecionar"
          class="w-full"
        />
      </template>
    </Card>

    <Card>
      <template #header>
        <div class="p-4">
          <h3 class="text-lg font-semibold">Status online</h3>
        </div>
      </template>
      <template #content>
        <div class="flex justify-between items-center">
          <span>Mostrar status online</span>
          <ToggleSwitch v-model="showOnline" />
        </div>
      </template>
    </Card>

    <Card>
      <template #header>
        <div class="p-4">
          <h3 class="text-lg font-semibold">Outros controles</h3>
        </div>
      </template>
      <template #content>
        <ul class="space-y-2">
          <li class="flex justify-between items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
            <span>Perfis restritos</span>
            <Button icon="pi pi-angle-right" text />
          </li>
          <li class="flex justify-between items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
            <span>Perfis bloqueados</span>
            <Button icon="pi pi-angle-right" text />
          </li>
          <li class="flex justify-between items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
            <span>Palavras ocultas</span>
            <Button icon="pi pi-angle-right" text />
          </li>
        </ul>
      </template>
    </Card>

    <Card>
      <template #header>
        <div class="p-4">
          <h3 class="text-lg font-semibold">Outras configurações de privacidade</h3>
        </div>
      </template>
      <template #content>
        <Button
          label="Ocultar número de curtidas e compartilhamentos"
          icon="pi pi-eye-slash"
          class="w-full"
          severity="secondary"
        />
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import ToggleSwitch from 'primevue/toggleswitch'
import Select from 'primevue/Select'

const isPrivate = ref(false)
const showOnline = ref(true)
const mentions = ref<string | null>(null)

const mentionOptions = [
  { label: 'Todos', value: 'todos' },
  { label: 'Somente amigos', value: 'amigos' },
  { label: 'Ninguém', value: 'ninguem' }
]
</script>