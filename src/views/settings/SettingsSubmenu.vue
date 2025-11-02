
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Card from 'primevue/card'
import ToggleSwitch from 'primevue/toggleswitch'
import Button from 'primevue/button'
import { menuItems } from '@/utils/menuData'
import type { MenuItem, SubMenuItem } from '@/types/settings'

const route = useRoute()
const router = useRouter()

const submenuId = computed(() => route.params.submenu as string)

const currentMenuItem = computed<MenuItem | undefined>(() => {
  return menuItems.find(item => item.id === submenuId.value)
})

const pageTitle = computed(() => {
  return currentMenuItem.value?.label || 'Configurações'
})

const subItems = computed<SubMenuItem[]>(() => {
  return currentMenuItem.value?.items || []
})

const goBack = () => {
  router.push('/settings')
}
</script>

<template>
  <div class="settings-submenu">
    <div class="submenu-header">
      <Button
        icon="pi pi-arrow-left"
        @click="goBack"
        text
        rounded
        class="md:hidden back-button"
        aria-label="Voltar"
      />
      <h1 class="submenu-title">{{ pageTitle }}</h1>
    </div>

    <div class="submenu-content">
      <Card v-if="subItems.length === 0" class="empty-card">
        <template #content>
          <div class="empty-state">
            <i :class="currentMenuItem?.icon" class="empty-state__icon"></i>
            <h2 class="empty-state__title">{{ pageTitle }}</h2>
            <p class="empty-state__description">
              Esta é a página de {{ pageTitle }}. Configure suas preferências aqui.
            </p>
          </div>
        </template>
      </Card>

      <Card v-else class="settings-card">
        <template #content>
          <div class="settings-list">
            <div
              v-for="(subItem, index) in subItems"
              :key="subItem.id"
              class="settings-item"
              :class="{ 'settings-item--last': index === subItems.length - 1 }"
            >
              <div class="settings-item__content">
                <div class="settings-item__info">
                  <i v-if="subItem.icon" :class="subItem.icon" class="settings-item__icon"></i>
                  <div class="settings-item__text">
                    <p class="settings-item__label">{{ subItem.label }}</p>
                    <p v-if="subItem.description" class="settings-item__description">
                      {{ subItem.description }}
                    </p>
                  </div>
                </div>

                <div class="settings-item__action">
                  <ToggleSwitch
                    v-if="subItem.type === 'toggle'"
                    :modelValue="subItem.value as boolean"
                    @update:modelValue="(val: boolean) => subItem.value = val"
                  />

                  <span
                    v-else-if="subItem.type === 'text'"
                    class="settings-item__value"
                  >
                    {{ subItem.value }}
                  </span>

                  <i
                    v-else-if="subItem.type === 'navigate'"
                    class="pi pi-chevron-right settings-item__chevron"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </template>
      </Card>

      <Card v-if="submenuId === 'privacy'" class="additional-card">
        <template #content>
          <div class="additional-content">
            <h3 class="additional-title">Outras Configurações de Privacidade</h3>
            <p class="additional-description">
              Algumas configurações, como restrição, se aplicam ao Threads e Instagram, e podem ser gerenciadas no Instagram.
            </p>
            <Button
              label="Ocultar número de curtidas e compartilhamentos"
              icon="pi pi-eye-slash"
              outlined
              class="additional-button"
            />
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>
.settings-submenu {
  min-height: 100vh;
  background: #f8f9fa;
}

.dark .settings-submenu {
  background: #0f1419;
}

.submenu-header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 2rem;
  background: white;
  border-bottom: 1px solid #e5e7eb;
}

.dark .submenu-header {
  background: #16181c;
  border-bottom-color: #2f3336;
}

.back-button {
  color: #536471;
}

.dark .back-button {
  color: #8b98a5;
}

.submenu-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #0f1419;
  margin: 0;
}

.dark .submenu-title {
  color: #ffffff;
}

@media (max-width: 768px) {
  .submenu-header {
    padding: 1rem;
    gap: 0.75rem;
  }

  .submenu-title {
    font-size: 1.125rem;
    font-weight: 600;
  }
}

@media (max-width: 480px) {
  .submenu-header {
    padding: 0.875rem 0.75rem;
  }

  .submenu-title {
    font-size: 1rem;
  }
}

.submenu-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (max-width: 768px) {
  .submenu-content {
    padding: 1rem;
    gap: 0.875rem;
  }
}

@media (max-width: 480px) {
  .submenu-content {
    padding: 0.75rem;
    gap: 0.75rem;
  }
}

.settings-card,
.empty-card,
.additional-card {
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  box-shadow: none;
}

@media (max-width: 480px) {
  .settings-card,
  .empty-card,
  .additional-card {
    border-radius: 0.5rem;
  }
}

.dark .settings-card,
.dark .empty-card,
.dark .additional-card {
  border-color: #2f3336;
  background: #16181c;
}

:deep(.p-card-content) {
  padding: 0;
}

.empty-state {
  padding: 3rem 1.5rem;
  text-align: center;
}

.empty-state__icon {
  font-size: 3rem;
  color: #1d9bf0;
  margin-bottom: 1rem;
}

.empty-state__title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #0f1419;
  margin: 0 0 0.5rem 0;
}

.dark .empty-state__title {
  color: #ffffff;
}

.empty-state__description {
  color: #536471;
  margin: 0;
}

.dark .empty-state__description {
  color: #8b98a5;
}

.settings-list {
  padding: 0.5rem 0;
}

.settings-item {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  transition: background 0.2s;
}

.dark .settings-item {
  border-bottom-color: #2f3336;
}

.settings-item--last {
  border-bottom: none;
}

.settings-item:hover {
  background: #f7f9f9;
}

.dark .settings-item:hover {
  background: #1c1f23;
}

.settings-item__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.settings-item__info {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  flex: 1;
}

.settings-item__icon {
  font-size: 1.25rem;
  color: #536471;
  margin-top: 0.125rem;
}

.dark .settings-item__icon {
  color: #8b98a5;
}

.settings-item__text {
  flex: 1;
}

.settings-item__label {
  font-size: 1rem;
  font-weight: 500;
  color: #0f1419;
  margin: 0 0 0.25rem 0;
}

.dark .settings-item__label {
  color: #ffffff;
}

.settings-item__description {
  font-size: 0.875rem;
  color: #536471;
  margin: 0;
}

.dark .settings-item__description {
  color: #8b98a5;
}

.settings-item__action {
  flex-shrink: 0;
}

.settings-item__value {
  font-size: 0.875rem;
  color: #536471;
}

.dark .settings-item__value {
  color: #8b98a5;
}

.settings-item__chevron {
  color: #8b98a5;
  font-size: 1rem;
}

.additional-content {
  padding: 1.5rem;
}

.additional-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #0f1419;
  margin: 0 0 0.5rem 0;
}

.dark .additional-title {
  color: #ffffff;
}

.additional-description {
  font-size: 0.875rem;
  color: #536471;
  margin: 0 0 1rem 0;
  line-height: 1.5;
}

.dark .additional-description {
  color: #8b98a5;
}

.additional-button {
  width: 100%;
}
</style>