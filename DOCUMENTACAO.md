# 📚 Guia de Documentação do Projeto

Este documento explica onde colocar diferentes tipos de documentação no projeto.

## 📁 Estrutura de Documentação

### README.md (Raiz do Projeto)
**Localização:** `/README.md`

**Conteúdo:**
- ✅ Instruções de instalação
- ✅ Comandos para executar o projeto
- ✅ Comandos para executar o Storybook
- ✅ Decisões técnicas relevantes
- ✅ Estrutura do projeto
- ✅ Solução de problemas

**Status:** ✅ **CRIADO E COMPLETO**

---

### Storybook - Documentação de Componentes
**Localização:** `.storybook/` (configuração) e `src/**/*.stories.ts` (stories)

**Componentes Documentados:**

#### ✅ 1. SettingsSidebar
- **Arquivo:** `src/components/settings/SettingsSidebar.stories.ts`
- **Variações:**
  - Default (estado padrão)
  - DarkMode (tema escuro)
  - Mobile (layout responsivo)

#### ✅ 2. LogoutDialog
- **Arquivo:** `src/components/settings/LogoutDialog.stories.ts`
- **Variações:**
  - Default (estado padrão)
  - Loading (com loading)
  - WithError (com erro)

#### ✅ 3. SettingsHome
- **Arquivo:** `src/components/settings/SettingsHome.stories.ts`
- **Variações:**
  - Default (estado padrão)
  - DarkMode (tema escuro)
  - Loading (carregando)
  - Mobile (layout mobile)

#### ✅ 4. ThemeToggle
- **Arquivo:** `src/components/ui/ThemeToggle.stories.ts`
- **Variações:**
  - LightMode
  - DarkMode
  - Interactive

**Comando para executar:**
```bash
npm run storybook
```

**Comando para build:**
```bash
npm run build-storybook
```

**Status:** ✅ **IMPLEMENTADO (4+ componentes)**

---

### Documentação Técnica Específica

#### TANSTACK_QUERY_IMPLEMENTATION.md
**Localização:** `/TANSTACK_QUERY_IMPLEMENTATION.md`

**Conteúdo:**
- Detalhes da implementação do TanStack Query
- Composables criados
- Exemplos de uso
- Status da implementação

**Status:** ✅ **CRIADO**

#### DOCUMENTACAO.md (este arquivo)
**Localização:** `/DOCUMENTACAO.md`

**Conteúdo:**
- Guia de onde colocar documentação
- Estrutura de arquivos de documentação
- Referências rápidas

**Status:** ✅ **CRIADO**

---

## 📝 Onde Colocar Novos Documentos

### Documentação Geral do Projeto
```
/README.md              ← Documentação principal (INSTALAÇÃO, USO, etc.)
/DOCUMENTACAO.md        ← Guia de documentação (este arquivo)
```

### Documentação Técnica Específica
```
/TANSTACK_QUERY_IMPLEMENTATION.md    ← Implementação TanStack Query
/CHANGELOG.md                        ← Histórico de mudanças (se necessário)
/CONTRIBUTING.md                     ← Guia de contribuição (se necessário)
```

### Documentação de Componentes
```
src/components/**/*.stories.ts      ← Stories do Storybook
.storybook/                         ← Configuração do Storybook
```

### Documentação de Código (Inline)
```
src/**/*.vue                        ← Comentários JSDoc nos componentes
src/**/*.ts                         ← Comentários de código
```

---

## 🎯 Checklist de Documentação

- [x] README.md com instruções completas
- [x] README.md com comandos de instalação
- [x] README.md com comandos de execução
- [x] README.md com comandos do Storybook
- [x] README.md com decisões técnicas
- [x] Storybook configurado
- [x] 3+ componentes documentados no Storybook
- [x] Variações de estados nos componentes
- [x] Documentação de TanStack Query

---

## 📖 Como Adicionar Novos Stories

Para documentar um novo componente no Storybook:

1. Crie o arquivo `ComponentName.stories.ts` na mesma pasta do componente:
```
src/components/MeuComponent/MeuComponent.vue
src/components/MeuComponent/MeuComponent.stories.ts
```

2. Estrutura básica de um story:
```typescript
import type { Meta, StoryObj } from '@storybook/vue3'
import MeuComponent from './MeuComponent.vue'

const meta = {
  title: 'Categoria/MeuComponent',
  component: MeuComponent,
  tags: ['autodocs'],
} satisfies Meta<typeof MeuComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}

export const Variacao1: Story = {
  args: {
    // props específicas
  }
}
```

---

## 🔍 Referências Rápidas

### Executar Projeto
```bash
npm run dev              # Desenvolvimento
npm run build            # Build produção
npm run preview          # Preview build
```

### Storybook
```bash
npm run storybook        # Desenvolvimento
npm run build-storybook  # Build estático
```

### Testes e Verificação
```bash
npm run type-check       # Verificar tipos TypeScript
```

---

**Última atualização:** 2024
