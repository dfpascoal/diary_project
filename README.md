# Desafio Settings - Vue 3

Aplicação de configurações desenvolvida com Vue 3, TypeScript, PrimeVue e TanStack Query, com documentação completa de componentes no Storybook.

## 🚀 Tecnologias

- **Vue 3** - Framework JavaScript progressivo
- **TypeScript** - Superset JavaScript com tipagem estática
- **Vite** - Build tool e dev server ultra-rápido
- **PrimeVue 4** - Biblioteca de componentes UI
- **Vue Router** - Roteamento oficial do Vue
- **TanStack Query** - Gerenciamento de estado assíncrono e cache
- **Mock Service Worker (MSW)** - Interceptação de requisições HTTP
- **Storybook** - Documentação e desenvolvimento de componentes isolados
- **Tailwind CSS** - Framework CSS utility-first

## 📋 Pré-requisitos

- Node.js >= 18.x
- npm >= 9.x ou yarn >= 1.22.x ou pnpm >= 8.x

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd desafio-settings-vue
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. (Opcional) Se for usar MSW em desenvolvimento, o arquivo `mockServiceWorker.js` já foi gerado na pasta `public`. Se necessário, regenere com:
```bash
npx msw init public --save
```

## ▶️ Executando o Projeto

### Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

### Build de Produção

Para gerar o build de produção:

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

### Preview do Build

Para visualizar o build de produção localmente:

```bash
npm run preview
```

### Type Checking

Para verificar erros de tipo TypeScript:

```bash
npm run type-check
```

## 📚 Storybook

### Executando o Storybook

Para iniciar o Storybook em modo desenvolvimento:

```bash
npm run storybook
```

O Storybook estará disponível em `http://localhost:6006`

### Build do Storybook

Para gerar uma versão estática do Storybook:

```bash
npm run build-storybook
```

Os arquivos serão gerados na pasta `storybook-static/`.

### Componentes Documentados

O projeto possui documentação Storybook para os seguintes componentes:

1. **SettingsSidebar** (`src/components/settings/SettingsSidebar.stories.ts`)
   - Default: Estado padrão da sidebar
   - DarkMode: Versão em tema escuro
   - Mobile: Layout responsivo mobile

2. **LogoutDialog** (`src/components/settings/LogoutDialog.stories.ts`)
   - Default: Estado padrão do modal
   - Loading: Estado de carregamento
   - WithError: Estado com erro

3. **SettingsHome** (`src/components/settings/SettingsHome.stories.ts`)
   - Default: Página inicial padrão
   - DarkMode: Versão em tema escuro
   - Loading: Estado de carregamento
   - Mobile: Layout responsivo

4. **ThemeToggle** (`src/components/ui/ThemeToggle.stories.ts`)
   - LightMode: Toggle no modo claro
   - DarkMode: Toggle no modo escuro
   - Interactive: Versão interativa

## 🏗️ Estrutura do Projeto

```
desafio-settings-vue/
├── public/                 # Arquivos estáticos
│   └── mockServiceWorker.js # Service Worker do MSW
├── src/
│   ├── assets/            # Recursos estáticos (CSS, imagens)
│   ├── components/        # Componentes Vue reutilizáveis
│   │   ├── settings/      # Componentes específicos de settings
│   │   └── ui/            # Componentes UI genéricos
│   ├── composables/       # Composables Vue (hooks)
│   ├── layouts/           # Layouts da aplicação
│   ├── mocks/             # Mocks do MSW
│   ├── plugins/           # Plugins Vue
│   ├── router/            # Configuração de rotas
│   ├── services/          # Serviços e APIs
│   ├── types/             # Tipos TypeScript
│   ├── utils/             # Funções utilitárias
│   ├── views/             # Views/Páginas
│   │   └── settings/      # Páginas de configurações
│   ├── App.vue            # Componente raiz
│   └── main.ts            # Entrada da aplicação
├── .storybook/            # Configuração do Storybook
└── package.json           # Dependências e scripts
```

## 🎯 Funcionalidades Implementadas

### ✅ Sistema de Rotas
- `/settings` - Tela principal com menu lateral
- `/settings/:submenu` - Subpáginas dinâmicas (privacidade, conta, etc.)
- Menu lateral fixo em desktop, oculto em mobile quando navegando
- Botão de voltar em mobile para retornar ao menu

### ✅ Botão de Logout
- Botão "Sair" na sidebar
- Modal de confirmação usando DynamicDialog do PrimeVue
- Mensagem: "Tem certeza que deseja sair?"
- Botões "Cancelar" e "Confirmar"

### ✅ Tema Claro/Escuro
- Toggle no header para alternar temas
- Usa temas Aura Light/Dark do PrimeVue
- Persistência da preferência no localStorage
- Suporte completo em todos os componentes

### ✅ TanStack Query
- `useUserProfile` - Busca dados do perfil do usuário
- `useUser` - Gerencia usuário e configurações com mutations
- API mockada usando MSW para desenvolvimento
- Cache e invalidação automática

### ✅ Storybook
- 4+ componentes documentados
- Diferentes estados e variações para cada componente
- Suporte a tema escuro nas stories
- Documentação automática gerada

## 🎨 Design e Responsividade

- Design moderno e limpo
- Totalmente responsivo (mobile-first)
- Sidebar fixo em desktop
- Navegação adaptativa para mobile
- Suporte completo a tema escuro
- Bordas arredondadas (0.75rem desktop, 0.5rem mobile)

## 🔍 Decisões Técnicas

### Por que Vue 3 com Composition API?
- Melhor performance com proxy-based reactivity
- Melhor tree-shaking e bundle size
- Composition API oferece melhor organização de código
- TypeScript support nativo

### Por que PrimeVue?
- Biblioteca madura e bem documentada
- Componentes acessíveis por padrão
- Suporte nativo a tema escuro
- Grande variedade de componentes prontos

### Por que TanStack Query?
- Cache inteligente e invalidação automática
- Estados de loading/error gerenciados automaticamente
- Reduz significativamente código boilerplate
- Ótima experiência de desenvolvedor

### Por que MSW?
- Permite desenvolvimento frontend sem backend real
- Intercepta requisições HTTP de forma transparente
- Fácil de configurar e manter
- Não requer mudanças no código de produção

### Por que Storybook?
- Documentação viva dos componentes
- Desenvolvimento isolado de componentes
- Testes visuais e interativos
- Facilita colaboração entre equipes

## 🐛 Solução de Problemas

### Erro: "Failed to register Service Worker"
Se o MSW apresentar erro, limpe o cache e regenere o service worker:
```bash
rm -rf node_modules/.vite
npx msw init public --save
npm run dev
```

### Erro: "Outdated Optimize Dep" no Vite
Limpe o cache de otimização do Vite:
```bash
# Windows (PowerShell)
Remove-Item -Recurse -Force node_modules\.vite

# Linux/Mac
rm -rf node_modules/.vite

npm run dev
```

### Componentes não aparecem
Certifique-se de que:
- Todas as dependências foram instaladas (`npm install`)
- O servidor de desenvolvimento está rodando
- Não há erros no console do navegador

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Preview do build de produção
- `npm run type-check` - Verifica tipos TypeScript
- `npm run storybook` - Inicia Storybook
- `npm run build-storybook` - Build estático do Storybook

## 🔗 Links Úteis

- [Vue 3 Documentation](https://vuejs.org/)
- [PrimeVue Documentation](https://primevue.org/)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Storybook Documentation](https://storybook.js.org/)
- [Vite Documentation](https://vitejs.dev/)

## 📄 Licença

Este projeto é privado e foi desenvolvido como parte de um desafio técnico.

---

Desenvolvido com ❤️ usando Vue 3 e TypeScript