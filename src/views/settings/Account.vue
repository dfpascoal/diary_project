<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import Card from 'primevue/card'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputMask from 'primevue/inputmask'
import Select from 'primevue/select'
import DatePicker from 'primevue/datepicker'

const router = useRouter()

const accountData = ref({
  name: 'João Silva',
  username: 'joaosilva',
  email: 'joao.silva@example.com',
  phone: '+55 11 98765-4321',
  birthDate: new Date('1995-06-15'),
  gender: 'Masculino',
  language: 'Português (Brasil)',
  timezone: 'America/Sao_Paulo'
})

const genderOptions = [
  { label: 'Masculino', value: 'Masculino' },
  { label: 'Feminino', value: 'Feminino' },
  { label: 'Outro', value: 'Outro' },
  { label: 'Prefiro não dizer', value: 'Prefiro não dizer' }
]
const languageOptions = [
  { label: 'Português (Brasil)', value: 'Português (Brasil)' },
  { label: 'English', value: 'English' },
  { label: 'Español', value: 'Español' }
]
const timezoneOptions = [
  { label: 'America/Sao_Paulo', value: 'America/Sao_Paulo' },
  { label: 'America/New_York', value: 'America/New_York' },
  { label: 'Europe/London', value: 'Europe/London' },
  { label: 'Asia/Tokyo', value: 'Asia/Tokyo' }
]

const isSmallScreen = ref(false)
onMounted(() => {
  const mq = window.matchMedia('(max-width: 640px)')
  const update = () => (isSmallScreen.value = mq.matches)
  mq.addEventListener?.('change', update)
  update()
  onUnmounted(() => mq.removeEventListener?.('change', update))
})

const goBack = (): void => {
  router.push('/settings')
}

const saveChanges = (): void => {
  console.log('Salvando alterações:', accountData.value)
  alert('Alterações salvas com sucesso!')
}

const cancelChanges = (): void => {
  goBack()
}
</script>

<template>
  <div class="account-settings">
    <div class="account-settings__header">
      <Button
        type="button"
        icon="pi pi-arrow-left"
        @click="goBack"
        text
        rounded
        class="md:hidden"
        aria-label="Voltar"
      ></Button>
      <h1 class="account-settings__title">Conta</h1>
    </div>

    <form class="account-settings__content" @submit.prevent="saveChanges" autocomplete="on">
      <Card class="settings-card">
        <template #header>
          <div class="card-header">
            <i class="pi pi-user card-icon"></i>
            <h3 class="card-title">Informações Pessoais</h3>
          </div>
        </template>

        <template #content>
          <div class="form-grid">
            <div class="form-field">
              <label for="name" class="field-label">Nome completo</label>
              <InputText
                id="name"
                v-model="accountData.name"
                autocomplete="name"
                class="w-full"
              ></InputText>
            </div>

            <div class="form-field">
              <label for="username" class="field-label">Nome de usuário</label>
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">@</span>
                <InputText
                  id="username"
                  v-model="accountData.username"
                  autocomplete="username"
                ></InputText>
              </div>
            </div>

            <div class="form-field">
              <label for="email" class="field-label">E-mail</label>
              <InputText
                id="email"
                v-model="accountData.email"
                type="email"
                autocomplete="email"
                class="w-full"
              ></InputText>
            </div>

            <div class="form-field">
              <label for="phone" class="field-label">Telefone</label>
              <InputMask
                id="phone"
                v-model="accountData.phone"
                mask="+55 99 99999-9999"
                slotChar="_"
                inputmode="tel"
                autocomplete="tel"
                class="w-full"
              ></InputMask>
            </div>

            <div class="form-field">
              <label for="birthDate" class="field-label">Data de nascimento</label>
              <DatePicker
                inputId="birthDate"
                v-model="accountData.birthDate"
                dateFormat="dd/mm/yy"
                autocomplete="bday"
                class="w-full responsive-datepicker"
                :showIcon="true"
                iconDisplay="input"
                appendTo="body"
                :touchUI="isSmallScreen"
              ></DatePicker>
            </div>

            <div class="form-field">
              <label for="gender" class="field-label">Gênero</label>
              <Select
                inputId="gender"
                v-model="accountData.gender"
                :options="genderOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Selecione"
                class="w-full responsive-select"
                appendTo="body"
                autocomplete="off"
              ></Select>
            </div>
          </div>
        </template>
      </Card>

      <Card class="settings-card">
        <template #header>
          <div class="card-header">
            <i class="pi pi-cog card-icon"></i>
            <h3 class="card-title">Preferências</h3>
          </div>
        </template>

        <template #content>
          <div class="form-grid">
            <div class="form-field">
              <label for="language" class="field-label">Idioma</label>
              <Select
                inputId="language"
                v-model="accountData.language"
                :options="languageOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Selecione"
                class="w-full responsive-select"
                appendTo="body"
                autocomplete="off"
              ></Select>
            </div>

            <div class="form-field">
              <label for="timezone" class="field-label">Fuso horário</label>
              <Select
                inputId="timezone"
                v-model="accountData.timezone"
                :options="timezoneOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Selecione"
                class="w-full responsive-select"
                appendTo="body"
                autocomplete="off"
              ></Select>
            </div>
          </div>
        </template>
      </Card>

      <Card class="settings-card">
        <template #header>
          <div class="card-header">
            <i class="pi pi-shield card-icon"></i>
            <h3 class="card-title">Segurança</h3>
          </div>
        </template>

        <template #content>
          <div class="security-actions">
            <Button
              type="button"
              label="Alterar senha"
              icon="pi pi-lock"
              outlined
              class="security-button"
            ></Button>
            <Button
              type="button"
              label="Autenticação de dois fatores"
              icon="pi pi-mobile"
              outlined
              class="security-button"
            ></Button>
            <Button
              type="button"
              label="Dispositivos conectados"
              icon="pi pi-desktop"
              outlined
              class="security-button"
            ></Button>
            <Button
              type="button"
              label="Sessões ativas"
              icon="pi pi-clock"
              outlined
              class="security-button"
            ></Button>
          </div>
        </template>
      </Card>

      <Card class="settings-card danger-card">
        <template #header>
          <div class="card-header">
            <i class="pi pi-exclamation-triangle card-icon"></i>
            <h3 class="card-title">Zona de Perigo</h3>
          </div>
        </template>

        <template #content>
          <div class="danger-zone">
            <p class="danger-description">Ações irreversíveis que afetam permanentemente sua conta.</p>
            <div class="danger-actions">
              <Button
                type="button"
                label="Desativar conta temporariamente"
                icon="pi pi-pause"
                severity="warning"
                outlined
                class="danger-button"
              ></Button>
              <Button
                type="button"
                label="Excluir conta permanentemente"
                icon="pi pi-trash"
                severity="danger"
                outlined
                class="danger-button"
              ></Button>
            </div>
          </div>
        </template>
      </Card>

      <div class="action-buttons">
        <Button
          type="button"
          label="Cancelar"
          icon="pi pi-times"
          severity="secondary"
          outlined
          @click="cancelChanges"
        ></Button>
        <Button
          type="submit"
          label="Salvar alterações"
          icon="pi pi-check"
        ></Button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.account-settings {
  min-height: 100vh;
  background: #f8f9fa;
}
.dark .account-settings {
  background: #0f1419;
}
.account-settings__header {
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
.dark .account-settings__header {
  background: #16181c;
  border-bottom-color: #2f3336;
}
.account-settings__title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #0f1419;
  margin: 0;
}
.dark .account-settings__title {
  color: #ffffff;
}
@media (max-width: 768px) {
  .account-settings__header {
    padding: 1rem;
    gap: 0.75rem;
  }
  .account-settings__title {
    font-size: 1.125rem;
    font-weight: 600;
  }
}
@media (max-width: 480px) {
  .account-settings__header {
    padding: 0.875rem 0.75rem;
  }
  .account-settings__title {
    font-size: 1rem;
  }
}
.account-settings__content {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
@media (max-width: 768px) {
  .account-settings__content {
    padding: 1rem;
    gap: 0.875rem;
  }
}
@media (max-width: 480px) {
  .account-settings__content {
    padding: 0.75rem;
    gap: 0.75rem;
  }
}
.settings-card {
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  box-shadow: none;
}
@media (max-width: 480px) {
  .settings-card {
    border-radius: 0.5rem;
  }
}
.dark .settings-card {
  border-color: #2f3336;
  background: #16181c;
}
.danger-card {
  border-color: #fca5a5;
}
.dark .danger-card {
  border-color: #7f1d1d;
}
.card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem 1.5rem 0;
}
@media (max-width: 480px) {
  .card-header {
    padding: 1rem 1rem 0;
  }
}
.card-icon {
  font-size: 1.25rem;
  color: #1d9bf0;
}
.danger-card .card-icon {
  color: #ef4444;
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
@media (max-width: 480px) {
  .card-title {
    font-size: 1rem;
  }
}
:deep(.p-card-content) {
  padding: 1.5rem;
}
@media (max-width: 480px) {
  :deep(.p-card-content) {
    padding: 1rem;
  }
}
.form-grid {
  display: grid;
  gap: 1.5rem;
}
@media (min-width: 768px) {
  .form-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 480px) {
  .form-grid {
    gap: 1.25rem;
  }
}
.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.field-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #0f1419;
}
.dark .field-label {
  color: #ffffff;
}
:deep(.p-inputtext),
:deep(.p-inputmask),
:deep(.p-datepicker-input),
:deep(.p-select) {
  width: 100%;
  font-size: 1rem;
  padding: 0.75rem;
}
@media (max-width: 480px) {
  :deep(.p-inputtext),
  :deep(.p-inputmask),
  :deep(.p-datepicker-input),
  :deep(.p-select) {
    font-size: 16px;
    padding: 0.875rem 0.75rem;
  }
}
:deep(.p-inputgroup) {
  width: 100%;
}
:deep(.p-inputgroup .p-inputtext) {
  flex: 1 1 auto;
  width: 100%;
}
:deep(.p-select-dropdown) {
  width: 2.5rem;
}
:deep(.p-select-label) {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
:deep(.p-select-overlay),
:deep(.p-datepicker-panel) {
  max-width: min(420px, 100vw - 2rem);
}
.security-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.security-button {
  width: 100%;
  justify-content: flex-start;
}
.danger-zone {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.danger-description {
  color: #dc2626;
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.5;
}
.dark .danger-description {
  color: #fca5a5;
}
.danger-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.danger-button {
  width: 100%;
  justify-content: flex-start;
}
.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding-top: 1rem;
}
@media (max-width: 768px) {
  .action-buttons {
    flex-direction: column-reverse;
  }
  .action-buttons button {
    width: 100%;
  }
}
</style>
