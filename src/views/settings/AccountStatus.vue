<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Avatar from 'primevue/avatar'
import Badge from 'primevue/badge'

const router = useRouter()

const userProfile = ref({
  name: 'João Silva',
  username: '@joaosilva',
  email: 'joao.silva@example.com',
  avatar: 'https://i.pravatar.cc/150?img=12',
  accountType: 'Pessoal',
  status: 'Ativo',
  createdAt: '15 de Janeiro de 2023',
  followers: 245,
  following: 189,
  posts: 87
})

const accountStats = ref([
  { label: 'Publicações', value: userProfile.value.posts, icon: 'pi-images' },
  { label: 'Seguidores', value: userProfile.value.followers, icon: 'pi-users' },
  { label: 'Seguindo', value: userProfile.value.following, icon: 'pi-user-plus' }
])

const accountInfo = ref([
  { label: 'Tipo de conta', value: userProfile.value.accountType, icon: 'pi-id-card' },
  { label: 'Status', value: userProfile.value.status, icon: 'pi-check-circle', badge: true },
  { label: 'Membro desde', value: userProfile.value.createdAt, icon: 'pi-DatePicker' },
  { label: 'E-mail', value: userProfile.value.email, icon: 'pi-envelope' }
])

const goBack = () => {
  router.push('/settings')
}
</script>

<template>
  <div class="account-status">

    <div class="account-status__header">
      <Button
        icon="pi pi-arrow-left"
        @click="goBack"
        text
        rounded
        class="md:hidden"
        aria-label="Voltar"
      />
      <h1 class="account-status__title">Status da conta</h1>
    </div>

    <div class="account-status__content">
      
      <Card class="profile-card">
        <template #content>
          <div class="profile-header">
            <Avatar
              :image="userProfile.avatar"
              size="xlarge"
              shape="circle"
              class="profile-avatar"
            />
            <div class="profile-info">
              <h2 class="profile-name">{{ userProfile.name }}</h2>
              <p class="profile-username">{{ userProfile.username }}</p>
              <Badge 
                :value="userProfile.status" 
                severity="success"
                class="profile-badge"
              />
            </div>
          </div>

          <div class="profile-stats">
            <div 
              v-for="stat in accountStats" 
              :key="stat.label"
              class="stat-item"
            >
              <i :class="`pi ${stat.icon}`" class="stat-icon"></i>
              <div class="stat-info">
                <span class="stat-value">{{ stat.value }}</span>
                <span class="stat-label">{{ stat.label }}</span>
              </div>
            </div>
          </div>
        </template>
      </Card>

      <Card class="info-card">
        <template #header>
          <div class="card-header">
            <h3 class="card-title">Informações da conta</h3>
          </div>
        </template>
        <template #content>
          <div class="info-list">
            <div 
              v-for="info in accountInfo" 
              :key="info.label"
              class="info-item"
            >
              <div class="info-item__left">
                <i :class="`pi ${info.icon}`" class="info-icon"></i>
                <span class="info-label">{{ info.label }}</span>
              </div>
              <div class="info-item__right">
                <Badge 
                  v-if="info.badge"
                  :value="info.value" 
                  severity="success"
                />
                <span v-else class="info-value">{{ info.value }}</span>
              </div>
            </div>
          </div>
        </template>
      </Card>

      <Card class="actions-card">
        <template #header>
          <div class="card-header">
            <h3 class="card-title">Ações da conta</h3>
          </div>
        </template>
        <template #content>
          <div class="actions-list">
            <Button
              label="Editar perfil"
              icon="pi pi-user-edit"
              outlined
              class="action-button"
            />
            <Button
              label="Alterar senha"
              icon="pi pi-lock"
              outlined
              class="action-button"
            />
            <Button
              label="Gerenciar dispositivos"
              icon="pi pi-mobile"
              outlined
              class="action-button"
            />
            <Button
              label="Baixar dados"
              icon="pi pi-download"
              outlined
              class="action-button"
            />
            <Button
              label="Desativar conta"
              icon="pi pi-power-off"
              severity="danger"
              outlined
              class="action-button"
            />
          </div>
        </template>
      </Card>

    </div>
  </div>
</template>

<style scoped>
.account-status {
  min-height: 100vh;
  background: #f8f9fa;
}

.dark .account-status {
  background: #0f1419;
}

.account-status__header {
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

.dark .account-status__header {
  background: #16181c;
  border-bottom-color: #2f3336;
}

.account-status__title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #0f1419;
  margin: 0;
}

.dark .account-status__title {
  color: #ffffff;
}

@media (max-width: 768px) {
  .account-status__header {
    padding: 1rem;
    gap: 0.75rem;
  }

  .account-status__title {
    font-size: 1.125rem;
    font-weight: 600;
  }
}

@media (max-width: 480px) {
  .account-status__header {
    padding: 0.875rem 0.75rem;
  }

  .account-status__title {
    font-size: 1rem;
  }
}

.account-status__content {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (max-width: 768px) {
  .account-status__content {
    padding: 1rem;
    gap: 0.875rem;
  }
}

@media (max-width: 480px) {
  .account-status__content {
    padding: 0.75rem;
    gap: 0.75rem;
  }
}

.profile-card,
.info-card,
.actions-card {
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  box-shadow: none;
}

@media (max-width: 480px) {
  .profile-card,
  .info-card,
  .actions-card {
    border-radius: 0.5rem;
  }
}

.dark .profile-card,
.dark .info-card,
.dark .actions-card {
  border-color: #2f3336;
  background: #16181c;
}

:deep(.p-card-content) {
  padding: 1.5rem;
}

.card-header {
  padding: 1.5rem 1.5rem 0;
}

.card-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #0f1419;
  margin: 0;
}

.dark .card-title {
  color: #ffffff;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
  }
}

.profile-avatar {
  border: 3px solid #1d9bf0;
}

.profile-info {
  flex: 1;
}

.profile-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f1419;
  margin: 0 0 0.25rem 0;
}

.dark .profile-name {
  color: #ffffff;
}

.profile-username {
  font-size: 1rem;
  color: #536471;
  margin: 0 0 0.75rem 0;
}

.dark .profile-username {
  color: #8b98a5;
}

.profile-badge {
  font-size: 0.875rem;
}

.profile-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.dark .profile-stats {
  border-top-color: #2f3336;
}

@media (max-width: 768px) {
  .profile-stats {
    grid-template-columns: 1fr;
  }
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f7f9f9;
  border-radius: 0.5rem;
}

.dark .stat-item {
  background: #1c1f23;
}

.stat-icon {
  font-size: 1.5rem;
  color: #1d9bf0;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f1419;
}

.dark .stat-value {
  color: #ffffff;
}

.stat-label {
  font-size: 0.875rem;
  color: #536471;
}

.dark .stat-label {
  color: #8b98a5;
}

.info-list {
  display: flex;
  flex-direction: column;
}

.info-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.dark .info-item {
  border-bottom-color: #2f3336;
}

.info-item:last-child {
  border-bottom: none;
}

.info-item__left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.info-icon {
  font-size: 1.25rem;
  color: #536471;
}

.dark .info-icon {
  color: #8b98a5;
}

.info-label {
  font-size: 1rem;
  font-weight: 500;
  color: #0f1419;
}

.dark .info-label {
  color: #ffffff;
}

.info-value {
  font-size: 0.875rem;
  color: #536471;
}

.dark .info-value {
  color: #8b98a5;
}

.actions-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.action-button {
  width: 100%;
  justify-content: flex-start;
}
</style>