# Implementação TanStack Query - Documentação

## ✅ Requisito Atendido

Criar pelo menos uma requisição simulada usando TanStack Query para buscar dados do "perfil do usuário" ou "configurações".

## 📋 Implementações Realizadas

### 1. **Configuração do TanStack Query**
- ✅ Plugin instalado e configurado em `src/main.ts`
- ✅ `VueQueryPlugin` registrado na aplicação

### 2. **Composables Criados**

#### `useUserProfile` (src/composables/useUserProfile.ts)
- **Função**: Busca dados do perfil do usuário
- **Query Key**: `['userProfile']`
- **Função de Fetch**: Simula uma requisição com delay de 1 segundo
- **Retorna**: 
  - `profile`: Dados do perfil (id, name, email, avatar, status)
  - `isLoading`: Estado de carregamento
  - `isError`: Estado de erro
  - `error`: Objeto de erro
  - `refetch`: Função para revalidar os dados
- **Uso**: Implementado em `SettingsHome.vue` para exibir o perfil do usuário

#### `useUser` (src/composables/useUser.ts)
- **Função**: Gerencia dados do usuário e configurações
- **Queries**:
  - `['user']`: Busca dados do usuário via `userApi.getUser`
  - `['user-settings']`: Busca configurações via `userApi.getSettings`
- **Mutations**:
  - `updateUserMutation`: Atualiza dados do usuário
  - `updateSettingsMutation`: Atualiza configurações
  - `deleteAccountMutation`: Deleta conta
  - `uploadAvatarMutation`: Faz upload de avatar
- **Cache**: Utiliza `queryClient` para gerenciar cache e invalidação

### 3. **API Mockada**

#### `userApi` (src/services/api/userApi.ts)
- **Endpoints**:
  - `GET /api/user`: Retorna dados do usuário
  - `GET /api/user/settings`: Retorna configurações
  - `PUT /api/user`: Atualiza dados do usuário
  - `PUT /api/user/settings`: Atualiza configurações
  - `DELETE /api/user`: Deleta conta
  - `POST /api/user/avatar`: Upload de avatar

### 4. **Mock Service Worker (MSW)**
- ✅ Configurado para interceptar requisições em desenvolvimento
- ✅ Handlers em `src/mocks/handlers.ts`
- ✅ Worker setup em `src/mocks/browser.ts`
- ✅ Dados mockados em `src/mocks/state.ts`

### 5. **Uso na Aplicação**
- ✅ `SettingsHome.vue` usa `useUserProfile()` para exibir:
  - Nome do usuário na mensagem de boas-vindas
  - Avatar e informações no card de perfil
  - Estado de loading durante a busca

## 🎯 Requisitos Atendidos

✅ **Requisição simulada usando TanStack Query**: Implementado  
✅ **Buscar dados do "perfil do usuário"**: Implementado via `useUserProfile`  
✅ **Buscar dados de "configurações"**: Implementado via `useUser`  
✅ **API fake/dados mockados**: Implementado usando MSW e dados mockados  

## 📝 Exemplo de Uso

```vue
<script setup lang="ts">
import { useUserProfile } from '@/composables/useUserProfile'

const { profile, isLoading, error } = useUserProfile()
</script>

<template>
  <div v-if="isLoading">Carregando...</div>
  <div v-else-if="error">Erro ao carregar</div>
  <div v-else>
    <p>{{ profile?.name }}</p>
    <img :src="profile?.avatar" :alt="profile?.name" />
  </div>
</template>
```

## ✅ Status: IMPLEMENTAÇÃO COMPLETA
