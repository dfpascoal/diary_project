Desafio Settings — Vue 3
Aplicação de configurações desenvolvida com Vue 3, TypeScript, PrimeVue 4, TanStack Query e Storybook.
Tecnologias
- Vue 3, TypeScript, Vite
- PrimeVue 4, PrimeIcons
- Vue Router
- TanStack Query
- Mock Service Worker (MSW)
- Storybook
- Tailwind CSS
Pré-requisitos
- Node.js 18+
- npm, yarn ou pnpm
Instalação
1) git clone <url-do-repositorio>
2) cd desafio-settings-vue
3) npm install
Execução
Desenvolvimento:
- npm run dev
Build de produção:
- npm run build
- npm run preview
Verificação de tipos:
- npm run type-check
Storybook
Desenvolvimento:
- npm run storybook
Build estático:
- npm run build-storybook
Estrutura
src/
  assets/
  components/
    settings/
    ui/
  composables/
  layouts/
  mocks/
  plugins/
  router/
  services/
  types/
  views/
  App.vue
  main.ts
.storybook/
public/
Funcionalidades
- Rotas: /settings e /settings/:submenu com layout responsivo.
- Logout com confirmação via DynamicDialog.
- Tema claro/escuro com persistência.
- Dados de usuário e configurações com TanStack Query e MSW.
- Componentes documentados no Storybook.
Solução de problemas
- Outdated Optimize Dep (Vite): apagar .vite e node_modules/.vite e reiniciar com --force.
- MSW em desenvolvimento: npx msw init public --save (se necessário).
Licença
Projeto privado para fins de desafio técnico.
