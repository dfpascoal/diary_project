<script setup lang="ts">
import { RouterLink } from 'vue-router'

const emit = defineEmits<{ (e: 'logout'): void }>()
</script>

<template>
  <nav class="sidebar-nav">
    <div class="sidebar-header">
      <span class="sidebar-header-title">Configurações</span>
    </div>
    <ul class="menu">
      <li>
        <RouterLink :to="{ name: 'settings-home' }" class="menu-item" active-class="is-active">
          <i class="pi pi-home menu-item-icon"></i>
          <span class="menu-item-text">Início</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'settings-submenu', params: { submenu: 'privacy' } }" class="menu-item" active-class="is-active">
          <i class="pi pi-lock menu-item-icon"></i>
          <span class="menu-item-text">Privacidade</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'account' }" class="menu-item" active-class="is-active">
          <i class="pi pi-id-card menu-item-icon"></i>
          <span class="menu-item-text">Conta</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'account-status' }" class="menu-item" active-class="is-active">
          <i class="pi pi-user menu-item-icon"></i>
          <span class="menu-item-text">Status da conta</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'help' }" class="menu-item" active-class="is-active">
          <i class="pi pi-question-circle menu-item-icon"></i>
          <span class="menu-item-text">Ajuda</span>
        </RouterLink>
      </li>
    </ul>
    <div class="logout">
      <RouterLink :to="{ name: 'settings-home' }" class="logout-link" @click.prevent="emit('logout')">
        <i class="pi pi-sign-out logout-icon"></i>
        <span>Sair</span>
      </RouterLink>
    </div>
  </nav>
</template>

<style scoped>
.sidebar-nav {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  height: 100%;
  box-sizing: border-box;
  background: #ffffff;
  overflow: hidden;
}

.dark .sidebar-nav {
  background: #16181c;
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0 1.5rem 1.5rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 1rem;
}

.dark .sidebar-header {
  border-bottom-color: #2f3336;
}

.sidebar-header-icon {
  font-size: 1.25rem;
  color: #536471;
}

.dark .sidebar-header-icon {
  color: #8b98a5;
}

.sidebar-header-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #0f1419;
}

.dark .sidebar-header-title {
  color: #ffffff;
}

.menu {
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
}

.menu li {
  margin: 0;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.5rem;
  color: #536471;
  text-decoration: none;
  font-size: 1rem;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.menu-item:hover {
  background: #f7f9f9;
  color: #0f1419;
}

.dark .menu-item {
  color: #8b98a5;
}

.dark .menu-item:hover {
  background: #1c1f23;
  color: #ffffff;
}

.menu-item.is-active {
  background: #f7f9f9;
  color: #0f1419;
  border-left-color: #1d9bf0;
  font-weight: 600;
}

.dark .menu-item.is-active {
  background: #1c1f23;
  color: #ffffff;
  border-left-color: #1d9bf0;
}

.menu-item-icon {
  font-size: 1.125rem;
  flex-shrink: 0;
  width: 1.25rem;
  text-align: center;
}

.menu-item-text {
  flex: 1;
}

.logout {
  padding: 1rem 1.5rem;
  margin-top: auto;
  border-top: 0;
}

.logout-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #dc2626;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  transition: all 0.2s ease;
}

.logout-link:hover {
  background: #fef2f2;
}

.dark .logout-link {
  color: #ef4444;
}

.dark .logout-link:hover {
  background: #7f1d1d;
}

.logout-icon {
  font-size: 1rem;
}

@media (max-width: 768px) {
  .sidebar-nav {
    padding: 1rem 0;
  }

  .sidebar-header {
    padding: 0 1rem 1rem 1rem;
  }

  .menu-item {
    padding: 1rem;
    border-radius: 0.75rem;
    margin: 0 0.5rem 0.25rem 0.5rem;
  }

  .menu-item:hover,
  .menu-item.is-active {
    border-left: 3px solid transparent;
    border-radius: 0.75rem;
  }

  .menu-item.is-active {
    background: #e0f2fe;
    border-left-color: transparent;
  }

  .dark .menu-item.is-active {
    background: #1e3a5f;
  }

  .logout {
    padding: 1rem;
  }

  .logout-link {
    border-radius: 0.75rem;
  }
}
</style>