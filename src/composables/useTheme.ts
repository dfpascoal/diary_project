import { ref, watch, computed } from 'vue'
import type { ThemeMode } from '@/types/settings'

const THEME_STORAGE_KEY = 'theme'
const THEME_LINK_ID = 'primevue-theme'

function ensureThemeLink() {
  if (typeof document === 'undefined') return null
  let link = document.getElementById(THEME_LINK_ID) as HTMLLinkElement | null
  if (!link) {
    link = document.createElement('link')
    link.id = THEME_LINK_ID
    link.rel = 'stylesheet'
    link.type = 'text/css'
    document.head.appendChild(link)
  }
  return link
}

function setPrimeTheme(mode: 'light' | 'dark') {
  const link = ensureThemeLink()
  if (!link) return
  
  const themeName = mode === 'dark' ? 'aura-dark-noir' : 'aura-light-noir'
  

  link.href = `/node_modules/@primevue/themes/aura/${themeName}/theme.css`
  
  link.onerror = () => {
    console.warn(`Tema ${themeName} não encontrado no caminho padrão`)
  }
}

export function useTheme() {
  const currentTheme = ref<ThemeMode>(
    (localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode) || 'light'
  )

  const isDark = computed(() => currentTheme.value === 'dark')

  const applyTheme = (theme: ThemeMode) => {
    if (typeof document === 'undefined') return
    
    const htmlElement = document.documentElement
    const mode = theme === 'dark' ? 'dark' : 'light'
    
    htmlElement.classList.toggle('dark', theme === 'dark')
    
    setPrimeTheme(mode)
    
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }

  const toggleTheme = () => {
    currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
  }

  const setTheme = (theme: ThemeMode) => {
    currentTheme.value = theme
  }

  if (typeof window !== 'undefined') {
    applyTheme(currentTheme.value)
  }

  watch(
    currentTheme,
    (newTheme) => {
      applyTheme(newTheme)
    }
  )

  return {
    currentTheme,
    isDark,
    toggleTheme,
    setTheme
  }
}