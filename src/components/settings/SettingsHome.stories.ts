import type { Meta, StoryObj } from '@storybook/vue3'
import SettingsHome from '@/views/settings/SettingsHome.vue'

const meta = {
  title: 'Views/SettingsHome',
  component: SettingsHome,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Página principal de configurações com estado vazio e informações do perfil do usuário',
      },
    },
  },
  decorators: [
    (Story) => ({
      components: { Story },
      setup() {
        return {}
      },
      template: `
        <div style="min-height: 100vh; background: white; padding: 0;">
          <Story />
        </div>
      `,
    }),
  ],
  render: (args) => ({
    components: { SettingsHome },
    setup() {
      return { args }
    },
    template: '<SettingsHome v-bind="args" />',
  }),
} satisfies Meta<typeof SettingsHome>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Página inicial de configurações mostrando estado vazio e perfil do usuário',
      },
    },
  },
}

export const DarkMode: Story = {
  decorators: [
    (Story) => ({
      components: { Story },
      setup() {
        return {}
      },
      template: `
        <div class="dark" style="min-height: 100vh; background: #0f1419; padding: 0;">
          <Story />
        </div>
      `,
    }),
  ],
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Página inicial no modo escuro',
      },
    },
  },
}

export const Loading: Story = {
  decorators: [
    (Story) => ({
      components: { Story },
      setup() {
        return {}
      },
      template: `
        <div style="min-height: 100vh; background: white; padding: 0;">
          <Story />
        </div>
      `,
    }),
  ],
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Estado de carregamento (simulado)',
      },
    },
  },
}

export const Mobile: Story = {
  decorators: [
    (Story) => ({
      components: { Story },
      setup() {
        return {}
      },
      template: `
        <div style="min-height: 100vh; background: white; padding: 0;">
          <Story />
        </div>
      `,
    }),
  ],
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    docs: {
      description: {
        story: 'Versão mobile da página inicial',
      },
    },
  },
  args: {},
}
