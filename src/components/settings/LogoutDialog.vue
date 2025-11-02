<script setup lang="ts">
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'
import Button from 'primevue/button'

const dialogRef = inject<DynamicDialogInstance>('dialogRef')
const router = useRouter()
const toast = useToast()

const isLoading = ref(false)
const error = ref<string | null>(null)

async function handleLogout() {
  if (isLoading.value) return
  isLoading.value = true
  error.value = null

  try {
    const onLogout = dialogRef?.data?.onLogout as (() => Promise<void>) | undefined
    if (onLogout) {
      await onLogout()
    } else {
      await new Promise(r => setTimeout(r, 1000))
      localStorage.clear()
      sessionStorage.clear()
      console.log('Usuário saiu')
    }

    toast.add({ severity: 'success', summary: 'Sessão encerrada', detail: 'Você saiu da conta.', life: 2500 })

    const redirectTo = (dialogRef?.data?.redirectTo as string | undefined) ?? '/login'
    
    // Fechar o dialog primeiro
    if (dialogRef && typeof dialogRef.close === 'function') {
      dialogRef.close({ ok: true })
    }
    
    // Aguardar um pouco antes de redirecionar
    setTimeout(() => {
      router.replace(redirectTo)
    }, 100)
  } catch (e: any) {
    error.value = e?.message ?? 'Não foi possível sair. Tente novamente.'
    toast.add({ severity: 'error', summary: 'Erro ao sair', detail: error.value, life: 3500 })
    isLoading.value = false
  } finally {
    if (!error.value) {
      isLoading.value = false
    }
  }
}

function handleCancel() {
  try {
    if (dialogRef && typeof dialogRef.close === 'function') {
      dialogRef.close({ ok: false })
    }
  } catch (e) {
    // Silenciosamente ignora erros ao fechar o dialog
    console.debug('Erro ao fechar dialog:', e)
  }
}
</script>

<template>
  <div class="logout-dialog" :aria-busy="isLoading">
    <div class="logout-dialog__icon" aria-hidden="true">
      <i class="pi pi-sign-out"></i>
    </div>

    <h2 class="logout-dialog__title">Tem certeza que deseja sair?</h2>

    <p class="logout-dialog__message">
      Você precisará fazer login novamente para acessar sua conta.
    </p>

    <p v-if="error" class="logout-dialog__error" role="alert">{{ error }}</p>

    <div class="logout-dialog__actions">
      <Button
        type="button"
        label="Cancelar"
        @click="handleCancel"
        severity="secondary"
        outlined
        :disabled="isLoading"
        class="logout-dialog__button"
      />
      <Button
        type="button"
        label="Confirmar"
        @click="handleLogout"
        severity="danger"
        :loading="isLoading"
        class="logout-dialog__button"
        autofocus
      />
    </div>
  </div>
</template>

<style scoped>
.logout-dialog {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  background: white;
  min-width: 400px;
}

.dark .logout-dialog {
  background: #16181c;
}

.logout-dialog__icon {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: #fef2f2;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.25rem;
  flex-shrink: 0;
}

.dark .logout-dialog__icon {
  background: #7f1d1d;
}

.logout-dialog__icon i {
  font-size: 2rem;
  color: #ef4444;
}

.logout-dialog__title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f1419;
  margin: 0;
  text-align: center;
}

.dark .logout-dialog__title {
  color: #ffffff;
}

.logout-dialog__message {
  font-size: 1rem;
  color: #536471;
  text-align: center;
  line-height: 1.5;
  margin: 0;
  max-width: 400px;
}

.dark .logout-dialog__message {
  color: #8b98a5;
}

.logout-dialog__error {
  color: #dc2626;
  font-size: 0.95rem;
  text-align: center;
  padding: 0.75rem 1rem;
  background: #fef2f2;
  border-radius: 0.5rem;
  border: 1px solid #fecaca;
  width: 100%;
}

.dark .logout-dialog__error {
  color: #fca5a5;
  background: #7f1d1d;
  border-color: #991b1b;
}

.logout-dialog__actions {
  display: flex;
  gap: 0.75rem;
  width: 100%;
  margin-top: 0.5rem;
}

.logout-dialog__button {
  flex: 1;
  min-width: 0;
}

.logout-dialog__button :deep(.p-button) {
  width: 100%;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
}

@media (max-width: 480px) {
  .logout-dialog {
    min-width: auto;
    padding: 1.5rem;
  }

  .logout-dialog__actions {
    flex-direction: column-reverse;
  }

  .logout-dialog__button {
    width: 100%;
  }
}
</style>
