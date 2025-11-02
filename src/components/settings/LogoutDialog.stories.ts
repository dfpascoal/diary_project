import type { Meta, StoryObj } from '@storybook/vue3'
import LogoutDialog from './LogoutDialog.vue'
import { provide } from 'vue'

const mockDialogRef = {
  close: (data?: any) => {
    console.log('Dialog closed with:', data)
  },
  data: {
    onLogout: async () => {
      console.log('Logout action called')
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }
}

const meta = {
  title: 'Settings/LogoutDialog',
  component: LogoutDialog,
  tags: ['autodocs'],
  decorators: [
    (Story: any) => ({
      components: { Story },
      setup() {
        provide('dialogRef', mockDialogRef)
      },
      template: '<div style="max-width: 500px; margin: 2rem auto;"><Story /></div>',
    }),
  ],
  render: (args: any) => ({
    components: { LogoutDialog },
    setup() {
      provide('dialogRef', mockDialogRef)
      return { args }
    },
    template: '<LogoutDialog v-bind="args" />',
  }),
} satisfies Meta<typeof LogoutDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Loading: Story = {
  args: {},
  decorators: [
    (Story: any) => ({
      components: { Story },
      setup() {
        provide('dialogRef', {
          ...mockDialogRef,
          data: {
            onLogout: async () => {
              await new Promise(resolve => setTimeout(resolve, 3000))
            }
          }
        })
      },
      template: '<div style="max-width: 500px; margin: 2rem auto;"><Story /></div>',
    }),
  ],
}

export const WithError: Story = {
  args: {},
  decorators: [
    (Story: any) => ({
      components: { Story },
      setup() {
        provide('dialogRef', {
          ...mockDialogRef,
          data: {
            onLogout: async () => {
              throw new Error('Erro ao fazer logout. Tente novamente.')
            }
          }
        })
      },
      template: '<div style="max-width: 500px; margin: 2rem auto;"><Story /></div>',
    }),
  ],
}