import type { Meta, StoryObj } from '@storybook/vue3'
import SettingsSidebar from './SettingsSidebar.vue'

const meta = {
  title: 'Settings/SettingsSidebar',
  component: SettingsSidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Sidebar de navegação das configurações com menu e botão de logout',
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
        <div style="height: 600px; background: #f7f9f9; display: flex; align-items: stretch;">
          <div style="width: 280px; border-right: 1px solid #e5e7eb;">
            <Story />
          </div>
        </div>
      `,
    }),
  ],
  render: (args) => ({
    components: { SettingsSidebar },
    setup() {
      const handleLogout = () => {
        console.log('Logout clicked')
      }
      return { args, handleLogout }
    },
    template: '<SettingsSidebar v-bind="args" @logout="handleLogout" />',
  }),
} satisfies Meta<typeof SettingsSidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Estado padrão da sidebar com todos os itens de menu visíveis',
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
        <div class="dark" style="height: 600px; background: #16181c; display: flex; align-items: stretch;">
          <div style="width: 280px; border-right: 1px solid #2f3336;">
            <Story />
          </div>
        </div>
      `,
    }),
  ],
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Sidebar no modo escuro',
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
        <div style="height: 600px; background: #f7f9f9; display: flex; align-items: stretch;">
          <div style="width: 100%;">
            <Story />
          </div>
        </div>
      `,
    }),
  ],
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    docs: {
      description: {
        story: 'Versão mobile da sidebar ocupando toda a largura',
      },
    },
  },
  args: {},
}