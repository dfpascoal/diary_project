<script setup lang="ts">
import { computed } from 'vue'
import Card from 'primevue/card'
import { useUserProfile } from '@/composables/useUserProfile';
import ClientesHoje from '@/components/agenda/ClientesHoje.vue';

const { profile, isLoading } = useUserProfile()

const welcomeMessage = computed(() => {
  return profile.value 
    ? `Bem vindo de volta, ${profile.value.name}!` 
    : 'Bem vindo à configuração do seu aplicativo.'
})
</script>

<template>
  <div class="settings-home">
    <div class="settings-home-container">
      <div class="settings-home-header">
        <h1 class="settings-home-title">
          Barbearia Diária
        </h1>
        
        <p v-if="!isLoading" class="settings-home-subtitle">
          {{ welcomeMessage }}
        </p>
      </div>

      <Card class="settings-card-empty">
        <template #content>
          <div style="padding: 2rem; color: white;">
              
            <ClientesHoje />
          </div>
        </template>
      </Card>
      
      <Card v-if="profile" class="settings-card-profile">
        <template #header>
          <div class="profile-card-header">
            <h3 class="profile-card-title">
              Seu Perfil
            </h3>
          </div>
        </template>
        <template #content>
          <div class="profile-card-content">
            <img 
              :src="profile.avatar" 
              :alt="profile.name"
              class="profile-avatar"
            />
            <div class="profile-info">
              <p class="profile-name">
                {{ profile.name }}
              </p>
              <div class="profile-details">
                <p class="profile-email">
                  {{ profile.email }}
                </p>
                <span class="profile-status">
                  <span class="profile-status-dot"></span>
                  {{ profile.status }}
                </span>
              </div>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>
.settings-home {
  min-height: 100%;
  padding: 3rem 2rem;
  background: white;
}

.dark .settings-home {
  background: #0f1419;
}

.settings-home-container {
  max-width: 1200px;
  margin: 0 auto;
}

.settings-home-header {
  margin-bottom: 2rem;
}

.settings-home-title {
  font-size: 4rem;
  font-weight: 300;
  color: #9ca3af;
  margin: 0 0 0.5rem 0;
  line-height: 1;
  letter-spacing: -0.02em;
}

.dark .settings-home-title {
  color: #6b7280;
}

.settings-home-subtitle {
  font-size: 1rem;
  color: #6b7280;
  margin: 0;
}

.dark .settings-home-subtitle {
  color: #9ca3af;
}

.settings-card-empty,
.settings-card-profile {
 border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  box-shadow: none;
  margin-bottom: 1.5rem;
}

.settings-card-empty {
  min-height: 400px;
}
.dark .settings-card-empty,
.dark .settings-card-profile {
  border-color: #2f3336;
  background: #16181c;
}

:deep(.p-card-content) {
  padding: 0;
}

.empty-state {
  padding: 4rem 2rem;
  text-align: center;
}

.empty-state-icon {
  font-size: 4rem;
  color: #3b82f6;
  margin-bottom: 1.5rem;
  display: block;
}

.empty-state-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #9ca3af;
  margin: 0 0 0.5rem 0;
}

.dark .empty-state-title {
  color: #6b7280;
}

.empty-state-description {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.dark .empty-state-description {
  color: #9ca3af;
}

.profile-card-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.dark .profile-card-header {
  border-bottom-color: #2f3336;
}

.profile-card-title {
  font-size: 1rem;
  font-weight: 500;
  color: #9ca3af;
  margin: 0;
}

.dark .profile-card-title {
  color: #6b7280;
}

.profile-card-content {
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.profile-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.profile-info {
  flex: 1;
}

.profile-name {
  font-size: 1rem;
  font-weight: 600;
  color: #0f1419;
  margin: 0 0 0.25rem 0;
}

.dark .profile-name {
  color: #ffffff;
}

.profile-details {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.profile-email {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.dark .profile-email {
  color: #9ca3af;
}

.profile-status {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  color: #16a34a;
}

.dark .profile-status {
  color: #22c55e;
}

.profile-status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #16a34a;
  display: inline-block;
}

.dark .profile-status-dot {
  background: #22c55e;
}

@media (max-width: 768px) {
  .settings-home {
    padding: 1.5rem 1rem;
  }

  .settings-home-header {
    margin-bottom: 1.5rem;
  }

  .settings-home-title {
    font-size: 2.5rem;
  }

  .settings-home-subtitle {
    font-size: 0.875rem;
  }

  .empty-state {
    padding: 2.5rem 1.5rem;
  }

  .empty-state-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .empty-state-title {
    font-size: 1.125rem;
  }

  .empty-state-description {
    font-size: 0.8125rem;
  }

  .profile-card-content {
    padding: 1.25rem;
    flex-direction: column;
    text-align: center;
  }

  .profile-avatar {
    width: 56px;
    height: 56px;
  }
}

@media (max-width: 480px) {
  .settings-home {
    padding: 1rem 0.75rem;
  }

  .settings-home-title {
    font-size: 2rem;
  }

  .settings-card-empty,
  .settings-card-profile {
    border-radius: 0.5rem;
    margin-bottom: 1rem;
  }

  .empty-state {
    padding: 2rem 1rem;
  }

  .empty-state-icon {
    font-size: 2.5rem;
  }

  .profile-card-header {
    padding: 0.875rem 1rem;
  }

  .profile-card-content {
    padding: 1rem;
  }
}
</style>