<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDialog } from 'primevue/usedialog'
import Button from 'primevue/button'
import SettingsSidebar from '@/components/settings/SettingsSidebar.vue'
import { useTheme } from '@/composables/useTheme'

const route = useRoute()
const router = useRouter()
const dialog = useDialog()
const { isDark, toggleTheme } = useTheme()

const isMobile = ref(false)
onMounted(() => {
  const mq = window.matchMedia('(max-width: 768px)')
  const update = () => (isMobile.value = mq.matches)
  mq.addEventListener?.('change', update)
  update()
  onUnmounted(() => mq.removeEventListener?.('change', update))
})

const isRoot = computed(() => route.name === 'settings-home')
const showSidebar = computed(() => !isMobile.value || isRoot.value)
const showContent = computed(() => !isMobile.value || !isRoot.value)

function goBack() {
  router.push({ name: 'settings-home' })
}

async function openLogout() {
  const { default: LogoutDialog } = await import('@/components/settings/LogoutDialog.vue')
  dialog.open(LogoutDialog, {
    props: { 
      header: '', 
      modal: true, 
      closable: true,
      dismissableMask: true,
      style: { width: '28rem' },
      contentClass: 'logout-dialog-container'
    },
    data: {
      onLogout: async () => {
        console.log('Usuário saiu')
        await new Promise(resolve => setTimeout(resolve, 500))
      },
      redirectTo: '/login'
    }
  })
}
</script>

<template>
  <header class="settings-header">
    <Button v-if="isMobile && !isRoot" icon="pi pi-arrow-left" text @click="goBack" aria-label="Voltar" />
    <h1 class="settings-title">Configurações</h1>
    <div class="spacer"></div>
    <Button :icon="isDark ? 'pi pi-moon' : 'pi pi-sun'" text @click="toggleTheme" aria-label="Alternar tema" />
  </header>
  <div class="settings-layout">
    <aside v-show="showSidebar" class="settings-sidebar">
      <SettingsSidebar @logout="openLogout" />
    </aside>
    <main v-show="showContent" class="settings-content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.settings-header {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 64px;
  padding: 0 2rem;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
.dark .settings-header {
  background: #16181c;
  border-bottom-color: #2f3336;
}

.settings-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f1419;
  margin: 0;
}
.dark .settings-title { color: #ffffff; }

.spacer { flex: 1; }

.settings-layout {
  display: flex;
  min-height: calc(100vh - 64px);
  background: #f8f9fa;
}
.dark .settings-layout { background: #0f1419; }

.settings-sidebar {
  width: 280px;
  flex-shrink: 0;
  background: #f7f9f9;
  border-right: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  height: calc(100vh - 64px);
  overflow-y: auto;
}
.dark .settings-sidebar {
  background: #16181c;
  border-right-color: #2f3336;
}

.settings-content {
  flex: 1;
  min-width: 0;
  overflow-y: auto;
  background: #ffffff;
}
.dark .settings-content { background: #0f1419; }

@media (max-width: 768px) {
  .settings-header {
    padding: 0 1rem;
    gap: 0.75rem;
    height: 56px;
  }

  .settings-title {
    font-size: 1.125rem;
    font-weight: 600;
  }

  .settings-layout {
    min-height: calc(100vh - 56px);
  }

  .settings-sidebar {
    position: relative;
    top: 0;
    width: 100%;
    height: auto;
    border-right: none;
    overflow: visible;
  }

  .settings-content {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .settings-header { padding: 0 0.875rem; height: 52px; }
  .settings-title { font-size: 1rem; }
  .settings-layout { min-height: calc(100vh - 52px); }
}
</style>