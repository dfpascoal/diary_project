import type { Meta, StoryObj } from '@storybook/vue3'
import ThemeToggle from './ThemeToggle.vue'

// Mock do composable useTheme
const mockUseTheme = {
  isDark: { value: false },
  toggleTheme: () => {
    mockUseTheme.isDark.value = !mockUseTheme.isDark.value
    console.log('Theme toggled to:', mockUseTheme.isDark.value ? 'dark' : 'light')
  }
}

const meta = {
  title: 'UI/ThemeToggle',
  component: ThemeToggle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente de toggle para alternar entre tema claro e escuro',
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
        <div style="padding: 2rem; background: #f7f9f9; border-radius: 0.5rem;">
          <Story />
        </div>
      `,
    }),
  ],
  render: (args) => ({
    components: { ThemeToggle },
    setup() {
      return { args }
    },
    template: '<ThemeToggle v-bind="args" />',
  }),
} satisfies Meta<typeof ThemeToggle>

export default meta
type Story = StoryObj<typeof meta>

export const LightMode: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Toggle no modo claro',
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
        <div class="dark" style="padding: 2rem; background: #16181c; border-radius: 0.5rem;">
          <Story />
        </div>
      `,
    }),
  ],
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Toggle no modo escuro',
      },
    },
  },
}

export const Interactive: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Versão interativa do toggle (clique para alternar)',
      },
    },
  },
}
