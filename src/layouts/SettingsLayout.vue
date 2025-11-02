<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDialog } from 'primevue/usedialog'
import Button from 'primevue/button'
import SettingsSidebar from '@/components/settings/SettingsSidebar.vue'

const route = useRoute()
const router = useRouter()
const dialog = useDialog()

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

const THEME_LINK_ID = 'primevue-theme'
const themes = {
  light: new URL('primevue/resources/themes/aura-light-noir/theme.css', import.meta.url).href,
  dark: new URL('primevue/resources/themes/aura-dark-noir/theme.css', import.meta.url).href
}

function ensureThemeLink() {
  let link = document.getElementById(THEME_LINK_ID) as HTMLLinkElement | null
  if (!link) {
    link = document.createElement('link')
    link.id = THEME_LINK_ID
    link.rel = 'stylesheet'
    document.head.appendChild(link)
  }
  return link
}

function setPrimeTheme(mode: 'light' | 'dark') {
  const link = ensureThemeLink()
  link.href = themes[mode]
  document.documentElement.classList.toggle('dark', mode === 'dark')
  localStorage.setItem('theme', mode)
}

const isDark = ref((localStorage.getItem('theme') || 'light') === 'dark')
onMounted(() => {
  setPrimeTheme(isDark.value ? 'dark' : 'light')
})

function toggleTheme() {
  isDark.value = !isDark.value
  setPrimeTheme(isDark.value ? 'dark' : 'light')
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
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 100;
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

.dark .settings-title {
  color: #ffffff;
}

.spacer {
  flex: 1;
}

.settings-layout {
  display: flex;
  min-height: calc(100vh - 73px);
  background: #f8f9fa;
}

.dark .settings-layout {
  background: #0f1419;
}

.settings-sidebar {
  width: 280px;
  background: #f7f9f9;
  border-right: 1px solid #e5e7eb;
  flex-shrink: 0;
  overflow-y: auto;
  position: fixed;
  left: 0;
  top: 73px;
  bottom: 0;
  height: calc(100vh - 73px);
  z-index: 10;
}

.dark .settings-sidebar {
  background: #16181c;
  border-right-color: #2f3336;
}

.settings-content {
  flex: 1;
  overflow-y: auto;
  background: white;
  margin-left: 280px;
}

.dark .settings-content {
  background: #0f1419;
}

@media (max-width: 768px) {
  .settings-header {
    padding: 0.75rem 1rem;
    gap: 0.75rem;
  }

  .settings-title {
    font-size: 1.125rem;
    font-weight: 600;
  }

  .settings-sidebar {
    position: relative;
    width: 100%;
    border-right: none;
    top: 0;
    height: auto;
    z-index: 1;
  }

  .settings-content {
    margin-left: 0;
  }

  .settings-layout {
    min-height: calc(100vh - 60px);
  }
}

@media (max-width: 480px) {
  .settings-header {
    padding: 0.625rem 0.875rem;
  }

  .settings-title {
    font-size: 1rem;
  }
}
</style>