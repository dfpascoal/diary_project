
import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import '@/plugins/primevue'


import PrimeVue from 'primevue/config'
import DialogService from 'primevue/dialogservice'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'
import { VueQueryPlugin } from '@tanstack/vue-query'

import 'primeicons/primeicons.css'

if (import.meta.env.DEV) {
  import('@/mocks/browser').then(({ worker }) => {
    worker.start({
      onUnhandledRequest: 'bypass',
    }).then(() => {
      console.log(' MSW iniciado')
    }).catch((error: Error) => {
      console.debug('MSW não disponível:', error.message)
    })
  }).catch(() => {
    console.debug('MSW módulo não disponível')
  })
}

const app = createApp(App)

app.use(PrimeVue, { ripple: true })
app.use(DialogService)
app.use(ConfirmationService)
app.use(ToastService)
app.use(router)
app.use(VueQueryPlugin)

app.mount('#app')